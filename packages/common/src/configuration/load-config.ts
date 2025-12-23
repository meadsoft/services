import zod from 'zod';
import path, { join } from 'path';
import { readFile, access } from 'fs/promises';
import * as dotenv from 'dotenv';
import { getAppEnv } from '../get-app-env';

export const DEFAULT_CONFIG_FILENAME_SCHEME = 'config.{env}.json';

/**
 * TODO: delete in favor of using the strongly typed ConfigLoader classes
 *
 * Loads configuration from a file and environment variables, validating them against
 * the provided schemas.
 */
export async function loadConfig<TConfig = object, TEnvConfig = object>(
    configFileDirectory: string,
    configKey?: string,
    schema?: zod.ZodType<TConfig>,
    envSchema?: zod.ZodType<TEnvConfig>,
    configFilenameScheme: string = DEFAULT_CONFIG_FILENAME_SCHEME,
): Promise<{
    config: TConfig | undefined;
    env: Partial<TEnvConfig> | undefined;
}> {
    const appEnv = getAppEnv();
    let config: TConfig | undefined;
    if (schema !== undefined && configKey !== undefined) {
        const configFile = configFilenameScheme.replace('{env}', appEnv);
        const configPath = join(configFileDirectory, configFile);
        await access(configPath);
        const fileContent = await readFile(configPath, 'utf-8');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const jsonConfig = JSON.parse(fileContent)[configKey];
        config = schema.parse(jsonConfig);
    }
    let env: Partial<TEnvConfig> | undefined;
    if (envSchema !== undefined) {
        const envFile = `.env.${appEnv}`;
        dotenv.config({ path: path.resolve(process.cwd(), envFile) });
        env = envSchema.parse(process.env);
        Object.keys(env).forEach((key) => {
            console.log(
                `Environment variable ${key} in use${configKey !== undefined ? ' for ' + configKey : ''}`,
            );
        });
    }
    console.log(
        `Loaded config${configKey !== undefined ? ' for ' + configKey : ''}`,
    );
    console.log(config);
    return { config, env };
}
