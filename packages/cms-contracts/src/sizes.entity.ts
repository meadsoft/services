import { z } from 'zod';
import { BaseModelSchema } from './base.entity';
import { createZodDto } from 'nestjs-zod';

export const NewSizeSchema = z.object({
    name: z.string(),
});

export const SizeSchema = BaseModelSchema.extend(NewSizeSchema.shape);
export const NewSizeJsonSchema = z.toJSONSchema(NewSizeSchema);
export const SizeJsonSchema = z.toJSONSchema(SizeSchema);
export class NewSize extends createZodDto(NewSizeSchema) {}
export class Size extends createZodDto(SizeSchema) {}
