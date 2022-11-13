import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';
import { Post } from 'src/posts/posts.schema';
import { Comment } from 'src/comments/comments.schema';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @ApiProperty({
    example: 'nepp1234',
    description: 'user name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '12341234',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  img_url: string;

  @Prop({
    ref: Post.name,
  })
  like_post_list: string[];

  @Prop({
    ref: Comment.name,
  })
  like_comment_list: string[];

  readonly readOnlyData: {
    id: string;
    name: string;
    email: string;
    img_url: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('readOnlyData').get(function (this: User) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    img_url: this.img_url,
  };
});
