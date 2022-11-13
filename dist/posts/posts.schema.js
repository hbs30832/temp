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
exports.PostSchema = exports.Post = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
const options = {
    timestamps: true,
};
let Post = class Post extends mongoose_2.Document {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'This is body...',
        description: "Post's body",
        required: true,
    }),
    (0, mongoose_1.Prop)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Post.prototype, "body", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        ref: 'users',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Post.prototype, "author_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '["tag1", "tag2"]',
        description: "Post's tag list",
    }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Post.prototype, "tag_list", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Post.prototype, "img_urls", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 0,
    }),
    __metadata("design:type", Number)
], Post.prototype, "like_count", void 0);
Post = __decorate([
    (0, mongoose_1.Schema)(options)
], Post);
exports.Post = Post;
const _PostSchema = mongoose_1.SchemaFactory.createForClass(Post);
_PostSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post_id',
});
_PostSchema.virtual('author', {
    ref: 'User',
    localField: 'author_id',
    foreignField: '_id',
});
_PostSchema.set('toObject', { virtuals: true });
_PostSchema.set('toJSON', { virtuals: true });
exports.PostSchema = _PostSchema;
//# sourceMappingURL=posts.schema.js.map