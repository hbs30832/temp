/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { User } from 'src/users/users.schema';
import { PostRequestDto } from './dto/posts.request.dto';
import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    createPost(post: PostRequestDto, files: Express.Multer.File[]): Promise<import("./posts.schema").Post>;
    getAllPost(page: number): Promise<Omit<import("./posts.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    getByAuthorId(author_id: string): Promise<Omit<import("./posts.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    updatePost(post_id: string, post: PostRequestDto): Promise<void>;
    updateLikeCount(post_id: string, user: User): Promise<import("./posts.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deletePost(post_id: string): Promise<import("./posts.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
