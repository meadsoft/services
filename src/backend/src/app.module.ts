import { Module } from '@nestjs/common';
import { FirebaseModule } from '@meadsoft/google/firebase/firebase.module';
import { FilesModule } from './files/files.module';
import { DebugModule } from './debug/debug.module';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from './api/http.module';

@Module({
    imports: [
        DebugModule,
        HttpModule,
        FilesModule,
        FirebaseModule,
        AuthModule,
        AdminModule,
        PassportModule.register({ defaultStrategy: 'google' }),
    ],
})
export class AppModule {}
