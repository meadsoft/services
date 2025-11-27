import { Module } from '@nestjs/common';
import { FirebaseModule } from '@haru-cafe/google/firebase/firebase.module';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FileMetadataRepository } from './files-metadata.repository';
import { FilesRepository } from './files.repository';

@Module({
    imports: [FirebaseModule],
    controllers: [FilesController],
    providers: [FileMetadataRepository, FilesRepository, FilesService],
    exports: [FilesService],
})
export class FilesModule {}
