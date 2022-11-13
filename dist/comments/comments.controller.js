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
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/jwt/jwt.guard");
const user_decorator_1 = require("../common/decorators/user.decorator");
const users_schema_1 = require("../users/users.schema");
const comments_service_1 = require("./comments.service");
const comments_request_dto_1 = require("./dto/comments.request.dto");
let CommentsController = class CommentsController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    async getPostsComments(post_id) {
        console.log(post_id);
        return await this.commentsService.getPostsComments(post_id);
    }
    async getCommentsByAuthor(author_id) {
        return await this.commentsService.getCommentsByAuthor(author_id);
    }
    async createComments(post_id, body) {
        return await this.commentsService.createComment(post_id, body);
    }
    async updateLikeCount(comment_id, user) {
        return await this.commentsService.updateLikeCount(comment_id, user);
    }
};
__decorate([
    (0, common_1.Get)(':post_id'),
    __param(0, (0, common_1.Param)('post_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "getPostsComments", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('author_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "getCommentsByAuthor", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '게시물 댓글 달기',
    }),
    (0, common_1.Post)(':post_id'),
    __param(0, (0, common_1.Param)('post_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, comments_request_dto_1.CommentsRequestDto]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "createComments", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '댓글 좋아요수 업데이트',
    }),
    (0, common_1.Patch)('like/:comment_id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('comment_id')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_schema_1.User]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "updateLikeCount", null);
CommentsController = __decorate([
    (0, swagger_1.ApiTags)('댓글'),
    (0, common_1.Controller)('comments'),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsController);
exports.CommentsController = CommentsController;
//# sourceMappingURL=comments.controller.js.map