import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from './request.model';
import { FirebaseService } from './firebase.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
    constructor(private readonly firebaseAuth: FirebaseService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);

        if (token === undefined) {
            throw new UnauthorizedException('No authentication token provided');
        }

        try {
            const decodedToken = await this.firebaseAuth.admin
                .auth()
                .verifyIdToken(token);
            request.user = decodedToken;
            return true;
        } catch {
            throw new UnauthorizedException('Invalid authentication token');
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
