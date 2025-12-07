import { z } from 'zod';
import { BaseModelSchema } from './base.entity';

export const NewTagSchema = z.object({
    name: z.string(),
});

export const TagSchema = BaseModelSchema.extend(NewTagSchema.shape);

export type NewTag = z.infer<typeof NewTagSchema>;
export type Tag = z.infer<typeof TagSchema>;
