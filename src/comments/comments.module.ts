import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from 'src/posts/posts.module';
import { PostsRepository } from 'src/posts/posts.repository';
import { UsersModule } from 'src/users/users.module';
import { CommentsController } from './comments.controller';
import { Comment, CommentsSchema } from './comments.schema';
import { CommentsService } from './comments.service';
import { CommentsRespository } from './repository/comments.repository';

@Module({
  imports: [
    PostsModule,
    UsersModule,
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentsSchema }]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRespository],
})
export class CommentsModule {}
