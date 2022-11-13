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
exports.PostsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const posts_schema_1 = require("./posts.schema");
let PostsRepository = class PostsRepository {
    constructor(postModel) {
        this.postModel = postModel;
    }
    async findAll(currentUser, page) {
        const result = await this.postModel
            .find()
            .sort({ _id: -1 })
            .populate('comments')
            .limit(10 * page);
        return result.filter((post) => post.author_id !== currentUser._id);
    }
    async findByUserId(author_id) {
        return await this.postModel.find({ author_id }).populate('comments');
    }
    async findByPostId(post_id) {
        return await this.postModel.findById(post_id);
    }
    async create(post) {
        return await this.postModel.create(post);
    }
    async updatePost(post_id, post) {
        const result = await this.postModel.findById(post_id);
        result.update(Object.assign({}, post));
    }
    async patchLikeCount(post_id, operator) {
        const targetPost = await this.postModel.findById(post_id);
        targetPost.like_count += operator;
        return await targetPost.save();
    }
    async delete(post_id) {
        return await this.postModel.findByIdAndDelete(post_id);
    }
};
PostsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(posts_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostsRepository);
exports.PostsRepository = PostsRepository;
//# sourceMappingURL=posts.repository.js.map