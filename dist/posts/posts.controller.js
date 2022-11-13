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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../common/decorators/user.decorator");
const users_schema_1 = require("../users/users.schema");
const posts_request_dto_1 = require("./dto/posts.request.dto");
const posts_service_1 = require("./posts.service");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    async createPost(post, files) {
        return await this.postsService.createPost('636f6426afc9d1eb9a44f43d', post, files);
    }
    async getAllPost(page) {
        return await this.postsService.getAllPost(page);
    }
    async getByAuthorId(author_id) {
        return await this.postsService.getByAuthorId(author_id);
    }
    async updatePost(post_id, post) {
        return await this.postsService.patchPost(post_id, post);
    }
    async updateLikeCount(post_id, user) {
        return await this.postsService.updateLikeCount(post_id, user);
    }
    async deletePost(post_id) {
        return await this.postsService.deletePost(post_id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: '게시물 작성',
    }),
    (0, swagger_1.ApiParam)({
        name: 'images',
        required: true,
        type: 'file',
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_request_dto_1.PostRequestDto, Array]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '모든 게시물 조회',
    }),
    (0, common_1.Get)('all/:page'),
    __param(0, (0, common_1.Param)('page', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getAllPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '유저 게시물 조회(작성자 id)',
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('author_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getByAuthorId", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '게시물 수정',
    }),
    (0, common_1.Patch)(':post_id'),
    __param(0, (0, common_1.Param)('post_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, posts_request_dto_1.PostRequestDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updatePost", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '좋아요',
    }),
    (0, common_1.Patch)('/like/:post_id'),
    __param(0, (0, common_1.Param)('post_id')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_schema_1.User]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updateLikeCount", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '게시물 삭제',
    }),
    (0, common_1.Delete)(':post_id'),
    __param(0, (0, common_1.Param)('post_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deletePost", null);
PostsController = __decorate([
    (0, swagger_1.ApiTags)('게시물'),
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
exports.PostsController = PostsController;
//# sourceMappingURL=posts.controller.js.map