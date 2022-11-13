"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const aws_service_1 = require("../aws/aws.service");
const posts_repository_1 = require("./posts.repository");
let PostsService = class PostsService {
    constructor(postsRepository, awsService) {
        this.postsRepository = postsRepository;
        this.awsService = awsService;
    }
    async getAllPost(currentUser, page) {
        return await this.postsRepository.findAll(currentUser, page);
    }
    async getByAuthorId(author_id) {
        return await this.postsRepository.findByUserId(author_id);
    }
    async createPost(author_id, post, files) {
        if (files.length < 1) {
            throw new common_1.HttpException('최소 한장 이상의 사진을 업로드해주세요.', 404);
        }
        const newPost = Object.assign(Object.assign({}, post), { author_id });
        const result = await this.postsRepository.create(newPost);
        if (files) {
            result.img_urls = await this.uploadImages(files);
            result.save();
        }
        return result;
    }
    async patchPost(post_id, post) {
        return this.postsRepository.updatePost(post_id, post);
    }
    async uploadImages(files) {
        const results = await Promise.all(files.map((file) => this.awsService.uploadFileToS3('posts', file)));
        return results.map((result) => this.awsService.getAwsS3FileUrl(result.key));
    }
    async updateLikeCount(post_id, user) {
        const isLikePost = user.like_post_list.includes(post_id);
        const operator = isLikePost ? -1 : 1;
        if (isLikePost) {
            user.like_post_list = user.like_post_list.filter((post) => post !== post_id);
        }
        else {
            user.like_post_list = user.like_post_list.concat(post_id);
        }
        await user.save();
        return this.postsRepository.patchLikeCount(post_id, operator);
    }
    async deletePost(post_id) {
        return await this.postsRepository.delete(post_id);
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [posts_repository_1.PostsRepository,
        aws_service_1.AwsService])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map