"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogInDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const users_schema_1 = require("../users.schema");
class UserLogInDto extends (0, swagger_1.PickType)(users_schema_1.User, [
    'email',
    'password',
]) {
}
exports.UserLogInDto = UserLogInDto;
//# sourceMappingURL=user.login.dto.js.map