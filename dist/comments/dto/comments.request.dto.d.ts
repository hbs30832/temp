import { Comment } from '../comments.schema';
declare const CommentsRequestDto_base: import("@nestjs/common").Type<Pick<Comment, "body" | "author_id">>;
export declare class CommentsRequestDto extends CommentsRequestDto_base {
}
export {};
