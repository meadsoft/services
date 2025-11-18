import { FirebaseService } from '@meadsoft/firebase/firebase.service';
import { Injectable } from '@nestjs/common';
import { FileMetadata } from './files.model';

@Injectable()
export class FileMetadataRepository {
    static readonly FILE_METADATA_TABLENAME = 'files';

    constructor(private readonly firebase: FirebaseService) {}

    async get(id: string): Promise<FileMetadata | null> {
        const snapshot = await this.firebase.db
            .collection(FileMetadataRepository.FILE_METADATA_TABLENAME)
            .where('id', '==', id)
            .get();
        if (snapshot.empty) {
            return null;
        }
        return snapshot.docs[0].data() as FileMetadata;
    }

    async upsert(fileMetadata: FileMetadata): Promise<FileMetadata> {
        const docRef = this.firebase.db
            .collection(FileMetadataRepository.FILE_METADATA_TABLENAME)
            .doc(fileMetadata.id);
        await docRef.set(fileMetadata, { merge: true });
        const updatedDoc = await docRef.get();
        return updatedDoc.data() as FileMetadata;
    }

    async delete(id: string): Promise<void> {
        await this.firebase.db
            .collection(FileMetadataRepository.FILE_METADATA_TABLENAME)
            .doc(id)
            .delete();
    }
}
