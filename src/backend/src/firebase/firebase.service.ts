import * as admin from 'firebase-admin';
import { Injectable, Logger } from '@nestjs/common';
import {
    FirebaseConfig,
    FirebaseEnvironmentConfig,
} from '@meadsoft/firebase/config.schema';

@Injectable()
export class FirebaseService {
    admin: typeof admin;
    app: admin.app.App;
    auth: admin.auth.Auth;
    db: admin.firestore.Firestore;
    storage: admin.storage.Storage;

    constructor(private readonly config: FirebaseConfig) {
        this.initialize();
    }

    private initialize() {
        if (!admin.apps.length) {
            this.app = admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: this.config.project_id,
                    clientEmail: this.config.client_email,
                    privateKey: this.config.privateKey?.replace(/\\n/g, '\n'),
                }),
            });
        }
        this.admin = admin;
        this.auth = this.app.auth();
        this.db = this.app.firestore();
        this.storage = this.app.storage();
        Logger.log(
            'Firebase initialized successfully for project: ' +
                this.config.project_id,
        );
    }
}
