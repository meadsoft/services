import { loadConfig } from '@haru-cafe/common';
import { Provider } from '@nestjs/common';
import zod from 'zod';
import path from 'path';

export const HaruCafeCms_CONFIG_KEY = 'haru-cms';

export class HaruCafeCmsConfig implements HaruCafeCmsEnvironmentConfig {
    /** # secret value. store in .env not in json */
    DATABASE_URL: string;

    constructor(databaseUrl: string) {
        this.DATABASE_URL = databaseUrl;
    }
}

export const HaruCafeCmsEnvironmentConfigSchema = zod.object({
    DATABASE_URL: zod.string().min(1),
}) satisfies zod.ZodType<HaruCafeCmsConfig>;

export type HaruCafeCmsEnvironmentConfig = zod.infer<
    typeof HaruCafeCmsEnvironmentConfigSchema
>;

export const HaruCafeCmsConfigProvider: Provider = {
    provide: HaruCafeCmsConfig,
    useFactory: async (): Promise<HaruCafeCmsConfig> => {
        const configDirectory = path.join(__dirname, '..');
        const settings = await loadConfig<undefined, HaruCafeCmsConfig>(
            HaruCafeCms_CONFIG_KEY,
            configDirectory,
            undefined,
            HaruCafeCmsEnvironmentConfigSchema,
        );
        const { env } = settings;
        if (env.DATABASE_URL === undefined) {
            throw new Error(
                'DATABASE_URL is not present as an environment variable.',
            );
        }
        const config: HaruCafeCmsConfig = {
            DATABASE_URL: env.DATABASE_URL,
        };
        return config;
    },
};
