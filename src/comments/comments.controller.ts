import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/users.schema';
import { CommentsService } from './comments.service';
import { CommentsRequestDto } from './dto/comments.request.dto';

@ApiTags('댓글')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':post_id')
  async getPostsComments(@Param('post_id') post_id: string) {
    console.log(post_id);
    return await this.commentsService.getPostsComments(post_id);
  }

  @Get()
  async getCommentsByAuthor(@Query('author_id') author_id: string) {
    return await this.commentsService.getCommentsByAuthor(author_id);
  }

  @ApiOperation({
    summary: '게시물 댓글 달기',
  })
  @Post(':post_id')
  async createComments(
    @Param('post_id') post_id: string,
    @Body() body: CommentsRequestDto,
  ) {
    return await this.commentsService.createComment(post_id, body);
  }

  @ApiOperation({
    summary: '댓글 좋아요수 업데이트',
  })
  @Patch('like/:comment_id')
  @UseGuards(JwtAuthGuard)
  async updateLikeCount(
    @Param('comment_id') comment_id: string,
    @CurrentUser() user: User,
  ) {
    return await this.commentsService.updateLikeCount(comment_id, user);
  }
}
