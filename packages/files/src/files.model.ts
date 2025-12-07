import { z } from 'zod';

export const FileMetadataSchema = z.object({
    id: z.string(),
    name: z.string(),
});

export const FileUrlSchema = z.object({
    metadata: FileMetadataSchema,
    url: z.string(),
    urlExpirationDate: z.string(),
});

export type FileMetadata = z.infer<typeof FileMetadataSchema>;
export type FileUrl = z.infer<typeof FileUrlSchema>;
