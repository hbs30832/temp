import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRequestDto } from './dto/users.request.dto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { User } from './users.schema';
import { AwsService } from 'src/aws/aws.service';
import { ObjectId } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly awsService: AwsService,
    ) { }
    async signUp(body: UserRequestDto) {
        const { name, email, password } = body;
        const isUserExist = await this.usersRepository.existByEmail(email);
        if (isUserExist) {
            throw new UnauthorizedException('이미 존재하는 계정입니다.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user.readOnlyData;
    }

    async findByName(name: string) {
        const users = await this.usersRepository.findUsersByName(name);

        const readOnlyUsers = users.map((user) => user.readOnlyData);

        return readOnlyUsers;
    }

    async findByUserId(id: string) {
        return await this.usersRepository.findUserByIdWithoutPassword(id);
    }
    async uploadImg(user: User, file: Express.Multer.File) {
        const result = await this.awsService.uploadFileToS3('profiles', file);

        const newUser = await this.usersRepository.findByIdAndUpdateImg(
            user.id,
            this.awsService.getAwsS3FileUrl(result.key),
        );

        return newUser;
    }

    async getAllUser() {
        const allUser = await this.usersRepository.findAll();
        const readOnlyUsers = allUser.map((user) => user.readOnlyData);
        return readOnlyUsers;
    }
}
