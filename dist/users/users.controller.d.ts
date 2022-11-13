/// <reference types="multer" />
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { UserRequestDto } from './dto/users.request.dto';
import { User } from './users.schema';
import { UsersService } from './users.service';
import { Response } from 'express';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    findByUserId(id: string): Promise<User>;
    signUp(body: UserRequestDto): Promise<{
        id: string;
        name: string;
        email: string;
        img_url: string;
    }>;
    logIn(data: LoginRequestDto, response: Response): Promise<void>;
    uploadUserImg(file: Express.Multer.File, user: User): Promise<{
        id: string;
        name: string;
        email: string;
        img_url: string;
    }>;
    getCurrentUser(user: User): {
        id: string;
        name: string;
        email: string;
        img_url: string;
    };
    findUsers(name: string): Promise<{
        id: string;
        name: string;
        email: string;
        img_url: string;
    }[]>;
    getAllUser(): Promise<{
        id: string;
        name: string;
        email: string;
        img_url: string;
    }[]>;
    logout(response: Response): void;
}
