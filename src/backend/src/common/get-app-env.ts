import { Environment } from './environment.enum';

export function getAppEnv(): Environment {
    const env = process.env.NODE_ENV;
    const envEnum = Environment[env as keyof typeof Environment];
    return envEnum ?? Environment.LOCAL;
}
