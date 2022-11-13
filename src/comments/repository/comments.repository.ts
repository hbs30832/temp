import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from '../comments.schema';
import { CommentsCreateDto } from '../dto/comments.create.dto';

@Injectable()
export class CommentsRespository {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async create(comment: CommentsCreateDto) {
    const newComment = new this.commentModel(comment);
    return await newComment.save();
  }

  async findByPostId(post_id: string) {
    const result = await this.commentModel.find({ post_id });
    console.log(result);
    return result;
  }

  async findByAuthorId(author_id: string) {
    return await this.commentModel.find({ author_id });
  }

  async patchLikeCount(comments_id: string, operator: number) {
    const comment = await this.commentModel.findById(comments_id);

    comment.like_count += operator;

    return await comment.save();
  }
}
