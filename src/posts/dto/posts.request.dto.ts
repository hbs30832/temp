import { PickType } from '@nestjs/swagger';
import { Post } from '../posts.schema';

export class PostRequestDto extends PickType(Post, [
  'body',
  'tag_list',
] as const) {}
