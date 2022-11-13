import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';
const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Post extends Document {
  // @ApiProperty({
  //   example: 'This is title...',
  //   description: "Post's title",
  //   required: true,
  // })
  // @Prop({
  //   required: true,
  // })
  // @IsString()
  // @IsNotEmpty()
  // title: string;

  @ApiProperty({
    example: 'This is body...',
    description: "Post's body",
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @Prop({
    required: true,
    ref: 'users',
  })
  @IsString()
  @IsNotEmpty()
  author_id: string;

  @ApiProperty({
    example: '["tag1", "tag2"]',
    description: "Post's tag list",
  })
  @Prop()
  tag_list: string[];

  @Prop()
  img_urls: string[];

  @Prop({
    default: 0,
  })
  like_count: number;
}

const _PostSchema = SchemaFactory.createForClass(Post);

_PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post_id',
});

_PostSchema.virtual('author', {
  ref: 'User',
  localField: 'author_id',
  foreignField: '_id',
});

_PostSchema.set('toObject', { virtuals: true });
_PostSchema.set('toJSON', { virtuals: true });

export const PostSchema = _PostSchema;
