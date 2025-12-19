import { FirebaseService } from '@meadsoft/google';
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
        const firstDoc = snapshot.docs.find((doc) => doc.id === id);
        if (!firstDoc) {
            return null;
        }
        return this.map(firstDoc);
    }

    async upsert(fileMetadata: FileMetadata): Promise<FileMetadata> {
        const docRef = this.firebase.db
            .collection(FileMetadataRepository.FILE_METADATA_TABLENAME)
            .doc(fileMetadata.id);
        await docRef.set(fileMetadata, { merge: true });
        const updatedDoc = await docRef.get();
        return this.map(updatedDoc);
    }

    async delete(id: string): Promise<void> {
        await this.firebase.db
            .collection(FileMetadataRepository.FILE_METADATA_TABLENAME)
            .doc(id)
            .delete();
    }

    map(document: FirebaseFirestore.DocumentSnapshot): FileMetadata {
        const data = document.data();
        return {
            id: document.id,
            name: data ? String(data.name) : '',
        } as FileMetadata;
    }
}
