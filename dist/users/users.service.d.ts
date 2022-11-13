/// <reference types="multer" />
import { UserRequestDto } from './dto/users.request.dto';
import { UsersRepository } from './users.repository';
import { User } from './users.schema';
import { AwsService } from 'src/aws/aws.service';
export declare class UsersService {
    private readonly usersRepository;
    private readonly awsService;
    constructor(usersRepository: UsersRepository, awsService: AwsService);
    signUp(body: UserRequestDto): Promise<{
        id: string;
        name: string;
        email: string;
        img_url: string;
    }>;
    findByName(name: string): Promise<{
        id: string;
        name: string;
        email: string;
        img_url: string;
    }[]>;
    findByUserId(id: string): Promise<User>;
    uploadImg(user: User, file: Express.Multer.File): Promise<{
        id: string;
        name: string;
        email: string;
        img_url: string;
    }>;
    getAllUser(): Promise<{
        id: string;
        name: string;
        email: string;
        img_url: string;
    }[]>;
}
