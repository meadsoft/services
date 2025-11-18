import { Injectable } from '@nestjs/common';
import { DecodedIdToken, UpdateRequest, UserRecord } from 'firebase-admin/auth';
import { FirebaseService } from '@meadsoft/firebase/firebase.service';

@Injectable()
export class UserRepository {
    constructor(private readonly firebase: FirebaseService) {}

    async verifyToken(token: string): Promise<DecodedIdToken> {
        return await this.firebase.auth.verifyIdToken(token);
    }

    async getUserByEmail(email: string): Promise<UserRecord> {
        return await this.firebase.auth.getUserByEmail(email);
    }

    async getUserById(uid: string): Promise<UserRecord> {
        return await this.firebase.auth.getUser(uid);
    }

    async createUser(email: string, password: string, displayName?: string) {
        return await this.firebase.auth.createUser({
            email,
            password,
            displayName,
        });
    }

    async updateUser(uid: string, properties: UpdateRequest) {
        return await this.firebase.auth.updateUser(uid, properties);
    }

    async deleteUser(uid: string): Promise<void> {
        await this.firebase.auth.deleteUser(uid);
    }

    async setCustomClaims(uid: string, claims: object): Promise<void> {
        await this.firebase.auth.setCustomUserClaims(uid, claims);
    }
}
