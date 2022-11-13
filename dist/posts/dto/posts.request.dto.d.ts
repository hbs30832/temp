import { Post } from '../posts.schema';
declare const PostRequestDto_base: import("@nestjs/common").Type<Pick<Post, "body" | "tag_list">>;
export declare class PostRequestDto extends PostRequestDto_base {
}
export {};
