import { User } from '../users.schema';
declare const UserLogInDto_base: import("@nestjs/common").Type<Pick<User, "email" | "password">>;
export declare class UserLogInDto extends UserLogInDto_base {
}
export {};
