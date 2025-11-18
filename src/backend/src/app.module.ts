import { Module } from '@nestjs/common';
import { FirebaseModule } from './firebase/firebase.module';
import { FilesModule } from './files/files.module';
import { FirebaseConfigProvider } from './firebase/config.schema';
import { HttpConfigProvider } from './api/http-config.provider';
import { DebugModule } from './debug/debug.module';

@Module({
    imports: [DebugModule, FilesModule, FirebaseModule],
    providers: [HttpConfigProvider, FirebaseConfigProvider],
})
export class AppModule {}
