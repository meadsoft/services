import path from 'path';
import * as dotenv from 'dotenv';
import { Logger, Provider } from '@nestjs/common';
import { EnvironmentConfig, EnvironmentSchema } from './environment.schema';
import { getAppEnv } from './get-app-env';

export const ENV_CONFIG = 'ENV_CONFIG_TOKEN';

export const provideEnvConfig: Provider = {
    provide: ENV_CONFIG,
    useFactory: async (): Promise<EnvironmentConfig> => {
        const appEnv = getAppEnv();
        const envFile = `.env.${appEnv}`;
        dotenv.config({ path: path.resolve(process.cwd(), envFile) });
        const envSettings = EnvironmentSchema.parse(process.env);
        Logger.debug('Environment settings');
        Logger.debug(envSettings);
        return envSettings;
    },
};
