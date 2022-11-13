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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const posts_repository_1 = require("../posts/posts.repository");
const users_repository_1 = require("../users/users.repository");
const comments_repository_1 = require("./repository/comments.repository");
let CommentsService = class CommentsService {
    constructor(commentsRepository, postsRepository, usersRepository) {
        this.commentsRepository = commentsRepository;
        this.postsRepository = postsRepository;
        this.usersRepository = usersRepository;
    }
    async getAllComments() {
        return 'a';
    }
    async getPostsComments(post_id) {
        return await this.commentsRepository.findByPostId(post_id);
    }
    async getCommentsByAuthor(author_id) {
        return await this.commentsRepository.findByAuthorId(author_id);
    }
    async createComment(post_id, comment) {
        try {
            const targetPost = await this.postsRepository.findByPostId(post_id);
            const { body, author_id } = comment;
            const validatedAuthor = await this.usersRepository.findUserByIdWithoutPassword(author_id);
            return await this.commentsRepository.create({
                author_id: validatedAuthor._id,
                body,
                post_id: targetPost._id,
            });
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async updateLikeCount(comment_id, user) {
        const isLikeComment = user.like_comment_list.includes(comment_id);
        const operator = isLikeComment ? -1 : 1;
        if (isLikeComment) {
            user.like_comment_list = user.like_comment_list.filter((comment) => comment !== comment_id);
        }
        else {
            user.like_comment_list = user.like_comment_list.concat(comment_id);
        }
        await user.save();
        return await this.commentsRepository.patchLikeCount(comment_id, operator);
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [comments_repository_1.CommentsRespository,
        posts_repository_1.PostsRepository,
        users_repository_1.UsersRepository])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map