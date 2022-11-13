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
exports.CommentsSchema = exports.Comment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
const posts_schema_1 = require("../posts/posts.schema");
const options = {
    timestamps: true,
};
let Comment = class Comment extends mongoose_2.Document {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '댓글 작성자 id',
        required: true,
    }),
    (0, mongoose_1.Prop)({
        required: true,
        ref: 'users',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Comment.prototype, "author_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '댓글 내용',
        required: true,
    }),
    (0, mongoose_1.Prop)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Comment.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: 0,
        description: '댓글 좋아요 수',
    }),
    (0, mongoose_1.Prop)({
        default: 0,
    }),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], Comment.prototype, "like_count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '댓글 대상 게시물 id',
        required: true,
    }),
    (0, mongoose_1.Prop)({
        required: true,
        ref: posts_schema_1.Post.name,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Comment.prototype, "post_id", void 0);
Comment = __decorate([
    (0, mongoose_1.Schema)(options)
], Comment);
exports.Comment = Comment;
exports.CommentsSchema = mongoose_1.SchemaFactory.createForClass(Comment);
//# sourceMappingURL=comments.schema.js.map