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
import { UserRequestDto } from './dto/users.request.dto';
import { User } from './users.schema';
export declare class UsersRepository {
    private readonly userModel;
    constructor(userModel: Model<User>);
    findUserByEmail(email: string): Promise<User | null>;
    findUsersByName(user_name: string): Promise<(User & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    existByEmail(email: string): Promise<boolean>;
    create(user: UserRequestDto): Promise<User>;
    findUserByIdWithoutPassword(id: string): Promise<User>;
    findByIdAndUpdateImg(id: string, imgUrl: string): Promise<{
        id: string;
        name: string;
        email: string;
        img_url: string;
    }>;
    findAll(): Promise<(User & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
