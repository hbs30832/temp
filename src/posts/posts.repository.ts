import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './posts.schema';
import { PostCreateDto } from './dto/posts.create.dto';

import { User } from 'src/users/users.schema';
import { PostRequestDto } from './dto/posts.request.dto';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async findAll(page: number) {
    const result = await this.postModel
      .find()
      .sort({ _id: -1 })
      .populate('comments')
      // .populate('author', '_id name email img_url')
      .limit(10 * page);

    return result;
  }

  async findByUserId(author_id: string) {
    return await this.postModel.find({ author_id }).populate('comments');
  }

  async findByPostId(post_id: string) {
    return await this.postModel.findById(post_id);
  }

  async create(post: PostCreateDto): Promise<Post> {
    return await this.postModel.create(post);
  }
  async updatePost(post_id: string, post: PostRequestDto) {
    const result = await this.postModel.findById(post_id);

    result.update({ ...post });
  }
  async patchLikeCount(post_id: string, operator: number) {
    const targetPost = await this.postModel.findById(post_id);

    targetPost.like_count += operator;

    return await targetPost.save();
  }

  async delete(post_id: string) {
    return await this.postModel.findByIdAndDelete(post_id);
  }
}
