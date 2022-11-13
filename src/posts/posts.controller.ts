import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/users.schema';
import { PostRequestDto } from './dto/posts.request.dto';
import { PostsService } from './posts.service';

@ApiTags('게시물')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({
    summary: '게시물 작성',
  })
  @ApiParam({
    name: 'images',
    required: true,
    type: 'file',
  })
  @UseInterceptors(FilesInterceptor('images'))
  async createPost(
    @Body() post: PostRequestDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return await this.postsService.createPost(
      '636f6426afc9d1eb9a44f43d',
      post,
      files,
    );
  }

  @ApiOperation({
    summary: '모든 게시물 조회',
  })
  @Get('all/:page')
  async getAllPost(@Param('page', ParseIntPipe) page: number) {
    return await this.postsService.getAllPost(page);
  }

  @ApiOperation({
    summary: '유저 게시물 조회(작성자 id)',
  })
  @Get()
  async getByAuthorId(@Query('author_id') author_id: string) {
    return await this.postsService.getByAuthorId(author_id);
  }

  @ApiOperation({
    summary: '게시물 수정',
  })
  @Patch(':post_id')
  async updatePost(
    @Param('post_id') post_id: string,
    @Body() post: PostRequestDto,
  ) {
    return await this.postsService.patchPost(post_id, post);
  }

  @ApiOperation({
    summary: '좋아요',
  })
  @Patch('/like/:post_id')
  async updateLikeCount(
    @Param('post_id') post_id: string,
    @CurrentUser() user: User,
  ) {
    return await this.postsService.updateLikeCount(post_id, user);
  }

  @ApiOperation({
    summary: '게시물 삭제',
  })
  @Delete(':post_id')
  async deletePost(@Param('post_id') post_id: string) {
    return await this.postsService.deletePost(post_id);
  }
}
