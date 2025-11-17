import * as admin from 'firebase-admin';
import type { EnvironmentConfig } from 'src/common/environment.schema';
import { Inject, Injectable } from '@nestjs/common';
import { ENV_CONFIG } from 'src/common/env-config.provider';

@Injectable()
export class FirebaseAdminService {
    admin: typeof admin;

    constructor(
        @Inject(ENV_CONFIG) private readonly config: EnvironmentConfig,
    ) {
        this.initialize();
    }

    private initialize() {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: this.config.FIREBASE_PROJECT_ID,
                    clientEmail: this.config.FIREBASE_CLIENT_EMAIL,
                    privateKey: this.config.FIREBASE_PRIVATE_KEY?.replace(
                        /\\n/g,
                        '\n',
                    ),
                }),
            });
        }
        this.admin = admin;
    }

    async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
        return await admin.auth().verifyIdToken(token);
    }

    async getUserByEmail(email: string): Promise<admin.auth.UserRecord> {
        return await admin.auth().getUserByEmail(email);
    }

    async getUserById(uid: string): Promise<admin.auth.UserRecord> {
        return await admin.auth().getUser(uid);
    }

    async createUser(email: string, password: string, displayName?: string) {
        return await admin.auth().createUser({
            email,
            password,
            displayName,
        });
    }

    async updateUser(uid: string, properties: admin.auth.UpdateRequest) {
        return await admin.auth().updateUser(uid, properties);
    }

    async deleteUser(uid: string): Promise<void> {
        await admin.auth().deleteUser(uid);
    }

    async setCustomClaims(uid: string, claims: object): Promise<void> {
        await admin.auth().setCustomUserClaims(uid, claims);
    }
}
