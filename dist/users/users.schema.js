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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
const posts_schema_1 = require("../posts/posts.schema");
const comments_schema_1 = require("../comments/comments.schema");
const options = {
    timestamps: true,
};
let User = class User extends mongoose_2.Document {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'nepp1234',
        description: 'user name',
        required: true,
    }),
    (0, mongoose_1.Prop)({
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'test@gmail.com',
        description: 'email',
        required: true,
    }),
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '12341234',
        description: 'password',
        required: true,
    }),
    (0, mongoose_1.Prop)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "img_url", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        ref: posts_schema_1.Post.name,
    }),
    __metadata("design:type", Array)
], User.prototype, "like_post_list", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        ref: comments_schema_1.Comment.name,
    }),
    __metadata("design:type", Array)
], User.prototype, "like_comment_list", void 0);
User = __decorate([
    (0, mongoose_1.Schema)(options)
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.virtual('readOnlyData').get(function () {
    return {
        id: this.id,
        email: this.email,
        name: this.name,
        img_url: this.img_url,
    };
});
//# sourceMappingURL=users.schema.js.map