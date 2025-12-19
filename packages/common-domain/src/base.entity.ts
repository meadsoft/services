import { ChangeHistory, ChangeHistorySchema } from '@meadsoft/common';
import { z } from 'zod';

export const EntitySchema = ChangeHistorySchema.extend({
    id: z.string(),
});

export type IEntity = z.infer<typeof EntitySchema>;

export class Entity implements IEntity, ChangeHistory {
    id!: string;
    createdDate!: string | null;
    updatedDate!: string | null;
    createdById!: string | null;
    updatedById!: string | null;
}
