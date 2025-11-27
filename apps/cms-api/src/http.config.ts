import { loadConfig } from '@haru-cafe/common/load-config';
import { Provider } from '@nestjs/common';
import zod from 'zod';

export const HTTP_CONFIG_KEY = 'http';

export class HttpConfig {
    port?: number;
}

export const HttpConfigSchema = zod.object({
    port: zod.number().min(1).max(65535),
}) satisfies zod.ZodType<HttpConfig>;

export const HttpConfigProvider: Provider = {
    provide: HttpConfig,
    useFactory: async (): Promise<HttpConfig> => {
        const { config } = await loadConfig(HTTP_CONFIG_KEY, HttpConfigSchema);
        return config;
    },
};
