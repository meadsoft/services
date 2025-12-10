import { z } from 'zod';
import { EntitySchema } from './base.entity';
import { createZodDto } from 'nestjs-zod';

export const NewTagSchema = z.object({
    name: z.string(),
});

export const TagSchema = EntitySchema.extend(NewTagSchema.shape);
export const NewTagJsonSchema = z.toJSONSchema(NewTagSchema);
export const TagJsonSchema = z.toJSONSchema(TagSchema);
export class NewTag extends createZodDto(NewTagSchema) {}
export class Tag extends createZodDto(TagSchema) {}
