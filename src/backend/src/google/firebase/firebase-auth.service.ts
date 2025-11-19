import { Injectable } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { Roles } from '@meadsoft/auth/roles.enum';

@Injectable()
export class FirebaseAuthService {
    constructor(private readonly firebaseService: FirebaseService) {}

    async verifyIdToken(idToken: string) {
        return this.firebaseService.auth.verifyIdToken(idToken);
    }

    async setUserRole(uid: string, roles: Roles[]) {
        await this.firebaseService.auth.setCustomUserClaims(uid, { roles });
    }
}
