import { OnCreationDataSchema } from './on-creation.entity';
import { z } from 'zod';

export const BaseModelSchema = OnCreationDataSchema.extend({
    id: z.string(),
});

export type BaseCmsModel = z.infer<typeof BaseModelSchema>;
