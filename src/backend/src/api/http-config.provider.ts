import { Provider } from '@nestjs/common';
import {
    HTTP_CONFIG_KEY,
    HttpConfig,
    HttpConfigSchema,
} from './http-config.schema';
import { loadConfig } from '@meadsoft/common/load-config';

export const HttpConfigProvider: Provider = {
    provide: HttpConfig,
    useFactory: async (): Promise<HttpConfig> => {
        const { config } = await loadConfig(HTTP_CONFIG_KEY, HttpConfigSchema);
        return config;
    },
};
