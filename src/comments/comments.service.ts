import { BadRequestException, Injectable } from '@nestjs/common';
import { PostsRepository } from 'src/posts/posts.repository';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/users.schema';
import { CommentsRequestDto } from './dto/comments.request.dto';
import { CommentsRespository } from './repository/comments.repository';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRespository,
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}
  async getAllComments() {
    return 'a';
  }

  async getPostsComments(post_id: string) {
    return await this.commentsRepository.findByPostId(post_id);
  }

  async getCommentsByAuthor(author_id: string) {
    return await this.commentsRepository.findByAuthorId(author_id);
  }

  async createComment(post_id: string, comment: CommentsRequestDto) {
    try {
      const targetPost = await this.postsRepository.findByPostId(post_id);

      const { body, author_id } = comment;
      const validatedAuthor =
        await this.usersRepository.findUserByIdWithoutPassword(author_id);

      return await this.commentsRepository.create({
        author_id: validatedAuthor._id,
        body,
        post_id: targetPost._id,
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async updateLikeCount(comment_id: string, user: User) {
    const isLikeComment = user.like_comment_list.includes(comment_id);

    const operator = isLikeComment ? -1 : 1;

    if (isLikeComment) {
      user.like_comment_list = user.like_comment_list.filter(
        (comment) => comment !== comment_id,
      );
    } else {
      user.like_comment_list = user.like_comment_list.concat(comment_id);
    }

    await user.save();

    return await this.commentsRepository.patchLikeCount(comment_id, operator);
  }
}
