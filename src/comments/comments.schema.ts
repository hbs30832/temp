import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/posts/posts.schema';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comment extends Document {
  @ApiProperty({
    description: '댓글 작성자 id',
    required: true,
  })
  @Prop({
    required: true,
    ref: 'users',
  })
  @IsString()
  @IsNotEmpty()
  author_id: string;

  @ApiProperty({
    description: '댓글 내용',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    default: 0,
    description: '댓글 좋아요 수',
  })
  @Prop({
    default: 0,
  })
  @IsPositive()
  like_count: number;

  @ApiProperty({
    description: '댓글 대상 게시물 id',
    required: true,
  })
  @Prop({
    required: true,
    ref: Post.name,
  })
  @IsString()
  @IsNotEmpty()
  post_id: string;
}

export const CommentsSchema = SchemaFactory.createForClass(Comment);
