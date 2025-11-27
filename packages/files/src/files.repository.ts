import { FirebaseService } from '@haru-cafe/google/firebase/firebase.service';
import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

@Injectable()
export class FilesRepository {
    static readonly FILES_BUCKET_NAME = 'uploads';

    constructor(private readonly firebase: FirebaseService) {}

    async getUrl(id: string, urlExpirationDate: string): Promise<string> {
        const bucket = this.firebase.storage.bucket();
        const file = bucket.file(id);

        // Generate a signed URL for downloading
        const [url] = await file.getSignedUrl({
            action: 'read',
            expires: urlExpirationDate,
        });

        return url;
    }

    async get(id: string): Promise<Buffer> {
        const file = this.firebase.storage.bucket().file(id);
        const [contents] = await file.download();
        return contents;
    }

    async upload(
        id: string,
        file: Express.Multer.File,
        urlExpirationDate: string,
    ): Promise<string> {
        const fileRef = this.firebase.storage.bucket().file(id);
        await fileRef.save(file.buffer, {
            contentType: file.mimetype,
        });
        const [url] = await fileRef.getSignedUrl({
            action: 'read',
            expires: urlExpirationDate,
        });
        return url;
    }

    async delete(id: string): Promise<boolean> {
        const [response] = await this.firebase.storage
            .bucket()
            .file(id)
            .delete();
        return response.statusCode === 200;
    }
}
