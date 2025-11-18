import { Module } from '@nestjs/common';
import { FirebaseService } from '@meadsoft/firebase';
import { FirebaseConfigProvider } from '@meadsoft/firebase/config.schema';
import { FirebaseAuthController } from '@meadsoft/firebase';
import { FirebaseAuthGuard } from '@meadsoft/firebase/auth.guard';

@Module({
    imports: [],
    controllers: [FirebaseAuthController],
    providers: [FirebaseService, FirebaseConfigProvider, FirebaseAuthGuard],
    exports: [FirebaseService],
})
export class FirebaseModule {}
