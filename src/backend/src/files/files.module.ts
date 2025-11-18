import { Module } from '@nestjs/common';
import { FirebaseModule } from '@meadsoft/firebase/firebase.module';
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
