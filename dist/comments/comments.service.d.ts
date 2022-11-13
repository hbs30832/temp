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
import { PostsRepository } from 'src/posts/posts.repository';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/users.schema';
import { CommentsRequestDto } from './dto/comments.request.dto';
import { CommentsRespository } from './repository/comments.repository';
export declare class CommentsService {
    private readonly commentsRepository;
    private readonly postsRepository;
    private readonly usersRepository;
    constructor(commentsRepository: CommentsRespository, postsRepository: PostsRepository, usersRepository: UsersRepository);
    getAllComments(): Promise<string>;
    getPostsComments(post_id: string): Promise<(import("./comments.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getCommentsByAuthor(author_id: string): Promise<(import("./comments.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    createComment(post_id: string, comment: CommentsRequestDto): Promise<import("./comments.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateLikeCount(comment_id: string, user: User): Promise<import("./comments.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
