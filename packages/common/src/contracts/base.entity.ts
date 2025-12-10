import { OnCreationDataSchema } from './on-creation.entity';
import { z } from 'zod';

export const EntitySchema = OnCreationDataSchema.extend({
    id: z.string(),
});

export type IEntity = z.infer<typeof EntitySchema>;
export class Entity implements IEntity {
    id!: string;
    createdDate!: string | null;
    updatedDate!: string | null;
    createdById!: string | null;
    updatedById!: string | null;
}
