import { OnCreationDataSchema } from './on-creation.entity';
import { z } from 'zod';

export const BaseModelSchema = OnCreationDataSchema.extend({
    id: z.string(),
});

export type IBaseCmsModel = z.infer<typeof BaseModelSchema>;
export class BaseCmsModel implements IBaseCmsModel {
    id!: string;
    createdDate!: string | null;
    updatedDate!: string | null;
    createdById!: string | null;
    updatedById!: string | null;
}
