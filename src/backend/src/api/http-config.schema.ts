import zod from 'zod';

export const HTTP_CONFIG_KEY = 'http';

export class HttpConfig {
    port: number;
}

export const HttpConfigSchema = zod.object({
    port: zod.number().min(1).max(65535),
}) satisfies zod.ZodType<HttpConfig>;
