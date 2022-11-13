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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("../auth/auth.service");
const login_request_dto_1 = require("../auth/dto/login.request.dto");
const jwt_guard_1 = require("../auth/jwt/jwt.guard");
const user_decorator_1 = require("../common/decorators/user.decorator");
const users_dto_1 = require("./dto/users.dto");
const users_request_dto_1 = require("./dto/users.request.dto");
const users_schema_1 = require("./users.schema");
const users_service_1 = require("./users.service");
const platform_express_1 = require("@nestjs/platform-express");
let UsersController = class UsersController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    async findByUserId(id) {
        return await this.usersService.findByUserId(id);
    }
    async signUp(body) {
        return await this.usersService.signUp(body);
    }
    async logIn(data, response) {
        const token = await this.authService.jwtLogin(data);
        if (token)
            response.cookie('jwt', token, { httpOnly: true });
    }
    async uploadUserImg(file, user) {
        return await this.usersService.uploadImg(user, file);
    }
    getCurrentUser(user) {
        return user.readOnlyData;
    }
    async findUsers(name) {
        return await this.usersService.findByName(name);
    }
    async getAllUser() {
        return this.usersService.getAllUser();
    }
    logout(response) {
        response.clearCookie("jwt");
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Server Error...',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '회원가입 성공',
        type: users_dto_1.ReadOnlyUserDto,
    }),
    (0, swagger_1.ApiOperation)({ summary: '회원가입' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_request_dto_1.UserRequestDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그인' }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Server Error...',
    }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_request_dto_1.LoginRequestDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '프로필 업로드' }),
    (0, swagger_1.ApiParam)({
        name: "images",
        required: true,
        type: "file"
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('upload'),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_schema_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadUserImg", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '현재 유저' }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'JWT 토큰 정보 없음',
    }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_schema_1.User]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getCurrentUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '유저 이름 검색' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '유저 이름 검색 성공',
    }),
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)('user_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findUsers", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({
        summary: '모든 회원 조회',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUser", null);
__decorate([
    (0, common_1.Post)("logout"),
    (0, swagger_1.ApiOperation)({
        summary: "로그아웃"
    }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "logout", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('회원'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map