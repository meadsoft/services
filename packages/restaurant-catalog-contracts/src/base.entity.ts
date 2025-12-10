import { OnCreationDataSchema } from './on-creation.entity';
import { z } from 'zod';

export const EntitySchema = OnCreationDataSchema.extend({
    id: z.string(),
});

export type Entity = z.infer<typeof EntitySchema>;
