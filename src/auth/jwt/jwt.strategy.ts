import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from './jwt.payload';
import { UsersRepository } from 'src/users/users.repository';
import { jwtExtractorFromCookies } from 'src/common/utils/jwtExtractorFromCookies';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersRepository: UsersRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([jwtExtractorFromCookies]),
            secretOrKey: process.env.JWT_SECRET,
            ingnoreExpiration: false,
        });
    }

    async validate(payload: Payload) {
        const user = await this.usersRepository.findUserByIdWithoutPassword(
            payload.sub,
        );

        if (user) {
            return user;
        } else {
            console.log('접근 오류');
            throw new UnauthorizedException('접근 오류');
        }
    }
}
