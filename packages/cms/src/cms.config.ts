import { loadConfig } from '../common/load-config';
import { Provider } from '@nestjs/common';
import zod from 'zod';

export const HaruCafeCms_CONFIG_KEY = 'haru-cms';

export class HaruCafeCmsConfig {
    /** # secret value. store in .env not in json */
    databaseUrl: string;

    constructor(databaseUrl: string) {
        this.databaseUrl = databaseUrl;
    }
}

export const HaruCafeCmsConfigSchema = zod.object({
    databaseUrl: zod.string().min(1),
}) satisfies zod.ZodType<HaruCafeCmsConfig>;

export const HaruCafeCmsConfigProvider: Provider = {
    provide: HaruCafeCmsConfig,
    useFactory: async (): Promise<HaruCafeCmsConfig> => {
        const settings = await loadConfig(
            HaruCafeCms_CONFIG_KEY,
            HaruCafeCmsConfigSchema,
            undefined,
        );
        const { config } = settings;
        return config;
    },
};
