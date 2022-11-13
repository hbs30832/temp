import { Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { UsersRepository } from 'src/users/users.repository';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    validate(payload: Payload): Promise<import("../../users/users.schema").User>;
}
export {};
