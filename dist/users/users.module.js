"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const platform_express_1 = require("@nestjs/platform-express");
const auth_module_1 = require("../auth/auth.module");
const aws_module_1 = require("../aws/aws.module");
const aws_service_1 = require("../aws/aws.service");
const users_controller_1 = require("./users.controller");
const users_repository_1 = require("./users.repository");
const users_schema_1 = require("./users.schema");
const users_service_1 = require("./users.service");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register(),
            mongoose_1.MongooseModule.forFeature([{ name: users_schema_1.User.name, schema: users_schema_1.UserSchema }]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            aws_module_1.AwsModule,
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, users_repository_1.UsersRepository, aws_service_1.AwsService],
        exports: [users_repository_1.UsersRepository],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map