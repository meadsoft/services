import { loadConfig } from '@meadsoft/common';
import { Provider } from '@nestjs/common';
import path from 'path';
import zod from 'zod';

export class InfrastructureConfig implements InfrastructureEnvironmentConfig {
    /** # secret value. store in .env not in json */
    DATABASE_URL: string;

    constructor(databaseUrl: string) {
        this.DATABASE_URL = databaseUrl;
    }
}

export const InfrastructureEnvironmentConfigSchema = zod.object({
    DATABASE_URL: zod.string().min(1),
}) satisfies zod.ZodType<InfrastructureConfig>;

export type InfrastructureEnvironmentConfig = zod.infer<
    typeof InfrastructureEnvironmentConfigSchema
>;

export const InfrastructureProvider: Provider = {
    provide: InfrastructureConfig,
    useFactory: async (): Promise<InfrastructureConfig> => {
        const configDirectory = path.join(__dirname, '..');
        const { env } = await loadConfig<
            InfrastructureConfig,
            InfrastructureEnvironmentConfig
        >(
            configDirectory,
            undefined,
            undefined,
            InfrastructureEnvironmentConfigSchema,
        );
        return new InfrastructureConfig(env.DATABASE_URL!);
    },
};
