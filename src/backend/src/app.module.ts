import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config.module';
import { FirebaseModule } from './firebase/firebase.module';
import { FirebaseAuthController } from './firebase/firebase.controller';

@Module({
    imports: [ConfigModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
