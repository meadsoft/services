import { ZodObject, ZodSafeParseResult } from 'zod';

export function validateSchema<T>(
    item: unknown,
    schema: ZodObject,
): ZodSafeParseResult<T> {
    const validationResult = schema.safeParse(item);
    return validationResult as ZodSafeParseResult<T>;
}
