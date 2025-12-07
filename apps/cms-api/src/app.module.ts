import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
// import { FirebaseModule } from '@haru-cafe/google';
// import { FilesModule } from '@haru-cafe/files';
import { HttpModule } from './http.module';
// import { DebugModule } from '@haru-cafe/debug';
// import { AuthModule } from '@haru-cafe/auth';
// import { DevtoolsModule } from '@nestjs/devtools-integration';
import { HaruCafeCmsModule } from '@haru-cafe/cms';
// import { HaruCafeDrizzlePgModule } from '@haru-cafe/cms';

@Module({
    imports: [
        // DevtoolsModule.register({
        //     http: process.env.NODE_ENV !== 'production',
        // }),
        // DebugModule,
        HttpModule,
        // HaruCafeDrizzlePgModule,
        HaruCafeCmsModule,
        // FilesModule,
        // FirebaseModule,
        // AuthModule,
        // PassportModule.register({ defaultStrategy: 'google' }),
    ],
})
export class AppModule {}
