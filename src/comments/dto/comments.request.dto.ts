import { PickType } from '@nestjs/swagger';
import { Comment } from '../comments.schema';

export class CommentsRequestDto extends PickType(Comment, [
  'author_id',
  'body',
] as const) {}
