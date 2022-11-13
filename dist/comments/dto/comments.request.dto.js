"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const comments_schema_1 = require("../comments.schema");
class CommentsRequestDto extends (0, swagger_1.PickType)(comments_schema_1.Comment, [
    'author_id',
    'body',
]) {
}
exports.CommentsRequestDto = CommentsRequestDto;
//# sourceMappingURL=comments.request.dto.js.map