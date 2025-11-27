import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FirebaseConfigProvider } from './firebase.config';
import { FirebaseAuthGuard } from './auth.guard';
import { FirebaseAuthService } from './firebase-auth.service.js';

@Module({
    imports: [],
    providers: [
        FirebaseService,
        FirebaseConfigProvider,
        FirebaseAuthGuard,
        FirebaseAuthService,
    ],
    exports: [FirebaseAuthService, FirebaseService],
})
export class FirebaseModule {}
