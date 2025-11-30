import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// import { FirebaseModule } from '@haru-cafe/google';
// import { FilesModule } from '@haru-cafe/files';
import { DebugModule } from '@haru-cafe/debug';
// import { AuthModule } from '@haru-cafe/auth';
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
