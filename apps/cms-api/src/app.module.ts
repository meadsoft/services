import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseModule } from '@haru-cafe/google/firebase/firebase.module';
import { FilesModule } from '@haru-cafe/files/files.module';
import { DebugModule } from '@haru-cafe/debug/debug.module';
import { AuthModule } from '@haru-cafe/auth/auth.module';
import { HttpModule } from './http.module';

@Module({
    imports: [
        DebugModule,
        HttpModule,
        // FilesModule,
        // FirebaseModule,
        // AuthModule,
        PassportModule.register({ defaultStrategy: 'google' }),
    ],
})
export class AppModule {}
