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
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { Post } from './posts.schema';
import { PostCreateDto } from './dto/posts.create.dto';
import { PostRequestDto } from './dto/posts.request.dto';
export declare class PostsRepository {
    private readonly postModel;
    constructor(postModel: Model<Post>);
    findAll(page: number): Promise<Omit<Post & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    findByUserId(author_id: string): Promise<Omit<Post & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    findByPostId(post_id: string): Promise<Post & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    create(post: PostCreateDto): Promise<Post>;
    updatePost(post_id: string, post: PostRequestDto): Promise<void>;
    patchLikeCount(post_id: string, operator: number): Promise<Post & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(post_id: string): Promise<Post & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
