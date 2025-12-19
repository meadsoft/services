import { z } from 'zod';

export class FileMetadata {
    constructor(
        public id: string,
        public name: string,
    ) {}
}

export class FileUrl {
    constructor(
        public metadata: FileMetadata,
        public url: string,
        public urlExpirationDate: string,
    ) {}
}

export const FileMetadataSchema = z.object({
    id: z.string(),
    name: z.string(),
}) satisfies z.ZodType<FileMetadata>;

export const FileUrlSchema = z.object({
    metadata: FileMetadataSchema,
    url: z.string(),
    urlExpirationDate: z.string(),
}) satisfies z.ZodType<FileUrl>;
