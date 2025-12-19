import { ChangeHistorySchema } from '@meadsoft/common';
import { z } from 'zod';

export const EntitySchema = ChangeHistorySchema.extend({
    id: z.string(),
});

export type Entity = z.infer<typeof EntitySchema>;
