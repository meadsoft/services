import { loadConfig } from '@haru-cafe/common';
import { Provider } from '@nestjs/common';
import zod from 'zod';
import path from 'path';

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
        const configDirectory = path.join(__dirname, '..');
        const { config } = await loadConfig(HTTP_CONFIG_KEY, configDirectory, HttpConfigSchema);
        return config;
    },
};
