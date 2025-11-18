import zod from 'zod';
import path, { join } from 'path';
import * as dotenv from 'dotenv';
import { getAppEnv } from './get-app-env';
import { readFile, access } from 'fs/promises';
import { Logger } from '@nestjs/common';

export async function loadConfig<TConfig, TEnvConfig>(
    configKey: string,
    schema: zod.ZodSchema<TConfig>,
    envSchema?: zod.ZodSchema<TEnvConfig>,
): Promise<{ config: TConfig; env: Partial<TEnvConfig> }> {
    const appEnv = getAppEnv();
    const configFile = `config.${appEnv}.json`;
    const configPath = join(__dirname, '..', configFile);
    try {
        await access(configPath);
    } catch {
        throw new Error(`Config file cannot be accessed at '${configPath}'`);
    }
    const fileContent = await readFile(configPath, 'utf-8');
    const jsonConfig = JSON.parse(fileContent)[configKey];
    const config = schema.parse(jsonConfig);
    let env: Partial<TEnvConfig> = {};
    if (envSchema !== undefined) {
        const envFile = `.env.${appEnv}`;
        dotenv.config({ path: path.resolve(process.cwd(), envFile) });
        env = envSchema.parse(process.env);
        Object.keys(env).forEach((key) => {
            Logger.debug(
                `Environment variable ${key} in use for '${configKey}'`,
            );
        });
    }
    Logger.debug(`Loaded config for key: ${configKey}`);
    Logger.debug(config);
    return { config, env };
}
