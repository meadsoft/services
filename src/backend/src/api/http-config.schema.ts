import zod from 'zod';

export const HTTP_CONFIG_KEY = 'http';
export const HttpConfigSchema = zod.object({
    port: zod.number().min(1).max(65535),
});

export type HttpConfig = zod.infer<typeof HttpConfigSchema>;
