import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { AUTH_COOKIE_NAME } from '../constants';

export function AuthGuard() {
    return NestAuthGuard(AUTH_COOKIE_NAME);
}
