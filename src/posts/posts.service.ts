import { HttpException, Injectable } from '@nestjs/common';
import { AwsService } from 'src/aws/aws.service';
import { User } from 'src/users/users.schema';
import { PostCreateDto } from './dto/posts.create.dto';
import { PostRequestDto } from './dto/posts.request.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
    constructor(
        private readonly postsRepository: PostsRepository,
        private readonly awsService: AwsService,
    ) { }

    async getAllPost(currentUser: User, page: number) {
        return await this.postsRepository.findAll(currentUser, page);
    }

    async getByAuthorId(author_id: string) {
        return await this.postsRepository.findByUserId(author_id);
    }

    async createPost(
        author_id: string,
        post: PostRequestDto,
        files: Express.Multer.File[],
    ) {
        if (files.length < 1) {
            throw new HttpException('최소 한장 이상의 사진을 업로드해주세요.', 404);
        }



        const newPost: PostCreateDto = { ...post, author_id };

        const result = await this.postsRepository.create(newPost);

        if (files) {
            result.img_urls = await this.uploadImages(files);
            result.save();
        }
        return result;
    }

    async patchPost(post_id: string, post: PostRequestDto) {
        return this.postsRepository.updatePost(post_id, post);
    }
    async uploadImages(files: Express.Multer.File[]) {
        const results = await Promise.all(
            files.map((file) => this.awsService.uploadFileToS3('posts', file)),
        );

        return results.map((result) => this.awsService.getAwsS3FileUrl(result.key));
    }

    async updateLikeCount(post_id: string, user: User) {
        const isLikePost: boolean = user.like_post_list.includes(post_id);
        const operator = isLikePost ? -1 : 1;

        if (isLikePost) {
            user.like_post_list = user.like_post_list.filter(
                (post) => post !== post_id,
            );
        } else {
            user.like_post_list = user.like_post_list.concat(post_id);
        }
        await user.save();
        return this.postsRepository.patchLikeCount(post_id, operator);
    }

    async deletePost(post_id: string) {
        return await this.postsRepository.delete(post_id);
    }
}
