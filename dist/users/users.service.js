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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const users_repository_1 = require("./users.repository");
const aws_service_1 = require("../aws/aws.service");
let UsersService = class UsersService {
    constructor(usersRepository, awsService) {
        this.usersRepository = usersRepository;
        this.awsService = awsService;
    }
    async signUp(body) {
        const { name, email, password } = body;
        const isUserExist = await this.usersRepository.existByEmail(email);
        if (isUserExist) {
            throw new common_1.UnauthorizedException('이미 존재하는 계정입니다.');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        return user.readOnlyData;
    }
    async findByName(name) {
        const users = await this.usersRepository.findUsersByName(name);
        const readOnlyUsers = users.map((user) => user.readOnlyData);
        return readOnlyUsers;
    }
    async findByUserId(id) {
        return await this.usersRepository.findUserByIdWithoutPassword(id);
    }
    async uploadImg(user, file) {
        const result = await this.awsService.uploadFileToS3('profiles', file);
        const newUser = await this.usersRepository.findByIdAndUpdateImg(user.id, this.awsService.getAwsS3FileUrl(result.key));
        return newUser;
    }
    async getAllUser() {
        const allUser = await this.usersRepository.findAll();
        const readOnlyUsers = allUser.map((user) => user.readOnlyData);
        return readOnlyUsers;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        aws_service_1.AwsService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map