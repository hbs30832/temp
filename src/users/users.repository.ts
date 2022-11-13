import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UserRequestDto } from './dto/users.request.dto';
import { User } from './users.schema';

@Injectable()
export class UsersRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) { }

    async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({ email });
        return user;
    }

    async findUsersByName(user_name: string) {
        const users = this.userModel.find({ name: new RegExp(`.*${user_name}.*`) });
        return users;
    }

    async existByEmail(email: string): Promise<boolean> {
        const result = await this.userModel.exists({ email });
        return result ? true : false;
    }

    async create(user: UserRequestDto): Promise<User> {
        return await this.userModel.create(user);
    }

    async findUserByIdWithoutPassword(id: string): Promise<User> {
        const user = await this.userModel.findById(id).select('-password');
        return user;
    }

    async findByIdAndUpdateImg(id: string, imgUrl: string) {
        const user = await this.userModel.findById(id);

        user.img_url = imgUrl;

        const newUser = await user.save();

        return newUser.readOnlyData;
    }

    // async updateLikePostList(user:User, operator:number) {

    //   if (operator) {
    //     user.like_post_list = user.like_post_list.filter((id) => id !== post_id);
    //   } else {
    //     user.like_post_list = [...user.like_post_list, post_id];
    //   }

    //   return await user.save();
    // }

    async findAll() {
        return await this.userModel.find();
    }
}
