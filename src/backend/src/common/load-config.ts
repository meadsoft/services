import zod from 'zod';
import { getAppEnv } from './get-app-env';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { Logger } from '@nestjs/common';

export async function loadConfig<T>(
    configKey: string,
    schema: zod.ZodSchema<T>,
): Promise<T> {
    const appEnv = getAppEnv();
    const configFile = `config.${appEnv}.json`;
    const configPath = join(__dirname, '..', configFile);
    const fileContent = await readFile(configPath, 'utf-8');
    const entireConfig = JSON.parse(fileContent);
    const config = schema.parse(entireConfig[configKey]);
    Logger.debug(`Loaded config for key: ${configKey}`);
    Logger.debug(config);
    return config;
}
