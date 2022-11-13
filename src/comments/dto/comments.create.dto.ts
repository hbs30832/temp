import { CommentsRequestDto } from './comments.request.dto';

export class CommentsCreateDto extends CommentsRequestDto {
  post_id: string;
}
