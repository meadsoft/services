import { Logger, Provider } from '@nestjs/common';
import {
    HTTP_CONFIG_KEY,
    HttpConfig,
    HttpConfigSchema,
} from './http-config.schema';
import { loadConfig } from 'src/common/load-config';

export const HTTP_CONFIG = 'HTTP_CONFIG_TOKEN';

export const provideHttpConfig: Provider = {
    provide: HTTP_CONFIG,
    useFactory: async (): Promise<HttpConfig> => {
        const settings = await loadConfig(HTTP_CONFIG_KEY, HttpConfigSchema);
        return settings;
    },
};
