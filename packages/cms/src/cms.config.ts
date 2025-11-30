import { loadConfig } from '@haru-cafe/common';
import { Provider } from '@nestjs/common';
import zod from 'zod';
import path from 'path';

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
        const configDirectory = path.join(__dirname, '..');
        const settings = await loadConfig<HaruCafeCmsConfig>(
            HaruCafeCms_CONFIG_KEY,
            configDirectory,
            HaruCafeCmsConfigSchema,
            undefined,
        );
        const { config } = settings;
        return config;
    },
};
