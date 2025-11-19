import { Module } from '@nestjs/common';
import { FirebaseService } from '@meadsoft/google/firebase';
import { FirebaseConfigProvider } from '@meadsoft/google/firebase/firebase.config';
import { FirebaseAuthGuard } from '@meadsoft/google/firebase/auth.guard';
import { FirebaseAuthService } from './firebase-auth.service';

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
