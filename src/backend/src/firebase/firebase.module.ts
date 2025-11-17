import { Module } from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin.service';
import { ConfigModule } from 'src/config.module';

@Module({
    imports: [ConfigModule],
    providers: [FirebaseAdminService],
    exports: [FirebaseAdminService],
})
export class FirebaseModule {}
