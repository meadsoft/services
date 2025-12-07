import { z } from 'zod';
import { BaseModelSchema } from './base.entity';

export const NewSizeSchema = z.object({
    name: z.string(),
});

export const SizeSchema = BaseModelSchema.extend(NewSizeSchema.shape);

export type NewSize = z.infer<typeof NewSizeSchema>;
export type Size = z.infer<typeof SizeSchema>;
