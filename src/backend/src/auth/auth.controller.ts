// auth.controller.ts
import { FirebaseAuthService } from '@meadsoft/google/firebase/firebase-auth.service';
import {
    Controller,
    Get,
    Post,
    Req,
    Res,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request, Response } from 'express';
import { DecodedIdToken } from 'firebase-admin/auth';
import { DEFAULT_ROLE } from './roles.enum';
import { User } from './user.model';
import { AuthConfig } from './auth.config';

export const AUTH_COOKIE_NAME = 'jwt';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly firebaseAuth: FirebaseAuthService,
        private readonly jwtService: JwtService,
        private readonly authConfig: AuthConfig,
    ) {}

    @Post('firebase-login')
    async firebaseLogin(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) throw new UnauthorizedException();

        const idToken = authHeader.split(' ')[1];
        let decoded: DecodedIdToken;
        try {
            decoded = await this.firebaseAuth.verifyIdToken(idToken);
        } catch {
            throw new UnauthorizedException();
        }

        const payload: User = {
            id: decoded.uid,
            email: decoded.email,
            roles: decoded.roles || [DEFAULT_ROLE],
        };
        const jwt = this.jwtService.sign(payload, {
            secret: this.authConfig.jwtSecret,
        });
        res.cookie(AUTH_COOKIE_NAME, jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return payload;
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response): Promise<void> {
        res.clearCookie(AUTH_COOKIE_NAME);
    }

    @Get('me')
    async getCurrentUser(@Req() req: Request): Promise<User> {
        const jwt = req.cookies?.[AUTH_COOKIE_NAME];
        if (!jwt) {
            throw new UnauthorizedException('Not authenticated');
        }

        let payload: User;
        try {
            payload = this.jwtService.verify(jwt);
        } catch {
            throw new UnauthorizedException('Invalid token');
        }

        return {
            id: payload.id,
            email: payload.email,
            roles: payload.roles,
        };
    }
}
