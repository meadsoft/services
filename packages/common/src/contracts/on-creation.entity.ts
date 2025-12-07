import { z } from 'zod';

export const OnCreationDataSchema = z.object({
    createdDate: z.iso.datetime().nullable(),
    updatedDate: z.iso.datetime().nullable(),
    createdById: z.string().nullable(),
    updatedById: z.string().nullable(),
});

export type OnCreationData = z.infer<typeof OnCreationDataSchema>;
