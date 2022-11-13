import { Post } from '../posts.schema';
declare const PostCreateDto_base: import("@nestjs/common").Type<Pick<Post, "body" | "tag_list">>;
export declare class PostCreateDto extends PostCreateDto_base {
    author_id: string;
}
export {};
