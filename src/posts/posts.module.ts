import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { AwsModule } from 'src/aws/aws.module';
import { AwsService } from 'src/aws/aws.service';
import { Comment, CommentsSchema } from 'src/comments/comments.schema';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { Post, PostSchema } from './posts.schema';
import { PostsService } from './posts.service';

@Module({
  imports: [
    MulterModule.register(),
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentsSchema },
      { name: Post.name, schema: PostSchema },
    ]),
    AuthModule,
    AwsModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, AwsService],
  exports: [PostsRepository],
})
export class PostsModule {}
