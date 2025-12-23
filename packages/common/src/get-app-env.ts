import { Environment } from './environment.enum';

export const DEFAULT_APP_ENV_KEY = 'APP_ENV';
export const DEFAULT_ENVIRONMENT = Environment.PROD;

export function getAppEnv(appEnvKey?: string): Environment {
    appEnvKey ??= DEFAULT_APP_ENV_KEY;
    const env = process.env[appEnvKey];
    const matchingEnv = Object.values(Environment).find((e) => e === env);
    if (matchingEnv !== undefined) {
        return matchingEnv;
    }
    return DEFAULT_ENVIRONMENT;
}
