import { z } from 'zod';
import { BaseModelSchema } from './base.entity';
import { createZodDto } from 'nestjs-zod';

export const NewTagSchema = z.object({
    name: z.string(),
});

export const TagSchema = BaseModelSchema.extend(NewTagSchema.shape);
export const NewTagJsonSchema = z.toJSONSchema(NewTagSchema);
export const TagJsonSchema = z.toJSONSchema(TagSchema);
export class NewTag extends createZodDto(NewTagSchema) {}
export class Tag extends createZodDto(TagSchema) {}
