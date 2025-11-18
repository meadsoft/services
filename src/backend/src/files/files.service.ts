import { Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { DateTime } from 'luxon';
import { FileMetadataRepository } from './files-metadata.repository';
import { FileMetadata, FileUrl } from './files.model';

@Injectable()
export class FilesService {
    constructor(
        private readonly filesRepo: FilesRepository,
        private readonly fileMetadataRepo: FileMetadataRepository,
    ) {}

    async getUrl(id: string, expirationDate?: string): Promise<string> {
        if (!expirationDate) {
            expirationDate = this.getDefaultExpirationDate().toISO();
        }
        return await this.filesRepo.getUrl(id, expirationDate);
    }

    async uploadMany(files: Express.Multer.File[]): Promise<FileUrl[]> {
        return await Promise.all(files.map((file) => this.upload(file)));
    }

    async upload(file: Express.Multer.File): Promise<FileUrl> {
        const fileMetadata: FileMetadata = this.createFileMetadata(file);
        const expirationDate = this.getDefaultExpirationDate().toISO();
        const url = await this.filesRepo.upload(
            fileMetadata.id,
            file,
            expirationDate,
        );
        return {
            metadata: fileMetadata,
            url,
            urlExpirationDate: expirationDate,
        };
    }

    async delete(id: string): Promise<void> {
        await this.filesRepo.delete(id);
        await this.fileMetadataRepo.delete(id);
    }

    private createFileMetadata(file: Express.Multer.File): FileMetadata {
        return {
            id: this.createFileName(file),
            name: file.originalname,
        };
    }

    private getDefaultExpirationDate() {
        return DateTime.now().plus({ weeks: 1 });
    }

    private createFileName(file: Express.Multer.File): string {
        const now = DateTime.now().toISODate();
        return `${FilesRepository.FILES_BUCKET_NAME}/${now}_${file.originalname}`;
    }
}
