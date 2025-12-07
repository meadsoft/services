import zod from 'zod';
import path, { join } from 'path';
import * as dotenv from 'dotenv';
import { getAppEnv } from './get-app-env';
import { readFile, access } from 'fs/promises';

export const DEFAULT_CONFIG_FILENAME_SCHEME = 'config.{env}.json';

export async function loadConfig<TConfig = object, TEnvConfig = object>(
    configFileDirectory: string,
    configKey?: string,
    schema?: zod.ZodSchema<TConfig>,
    envSchema?: zod.ZodSchema<TEnvConfig>,
    configFilenameScheme: string = DEFAULT_CONFIG_FILENAME_SCHEME,
): Promise<{ config: TConfig; env: Partial<TEnvConfig> }> {
    const appEnv = getAppEnv();
    let config = {} as TConfig;
    if (schema !== undefined && configKey !== undefined) {
        const configFile = configFilenameScheme.replace('{env}', appEnv);
        const configPath = join(configFileDirectory, configFile);
        try {
            await access(configPath);
        } catch {
            throw new Error(
                `Config file cannot be accessed at '${configPath}'`,
            );
        }
        const fileContent = await readFile(configPath, 'utf-8');
        const jsonConfig = JSON.parse(fileContent)[configKey];
        config = schema.parse(jsonConfig);
    }
    let env: Partial<TEnvConfig> = {};
    if (envSchema !== undefined) {
        const envFile = `.env.${appEnv}`;
        dotenv.config({ path: path.resolve(process.cwd(), envFile) });
        env = envSchema.parse(process.env);
        Object.keys(env).forEach((key) => {
            console.log(
                `Environment variable ${key} in use for '${configKey}'`,
            );
        });
    }
    console.log(`Loaded config for key: ${configKey}`);
    console.log(config);
    return { config, env };
}
