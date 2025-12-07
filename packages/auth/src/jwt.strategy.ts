import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User, UserSchema } from './user.model';
import { AuthConfig } from './auth.config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(authConfig: AuthConfig) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    // Extract JWT from HTTP-only cookie
                    return request?.cookies?.['access_token'];
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: authConfig.jwtSecret,
        });
    }

    async validate(payload: any): Promise<User> {
        if (!payload.sub) {
            throw new UnauthorizedException();
        }
        const result = UserSchema.safeParse(payload);
        if (!result.success) {
            throw new UnauthorizedException('Invalid token payload');
        }
        return result.data;
    }
}
