import { ChangeHistorySchema, IChangeHistory } from './change-history.schema';
import { z } from 'zod';

export const EntitySchema = ChangeHistorySchema.extend({
    id: z.string(),
});

export type IEntity = IChangeHistory & z.infer<typeof EntitySchema>;

export class Entity implements IEntity {
    id!: string;
    createdDate!: string | null;
    updatedDate!: string | null;
    createdById!: string | null;
    updatedById!: string | null;
}
