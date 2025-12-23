import path, { join } from 'path';
import { readFile, access } from 'fs/promises';
import * as dotenv from 'dotenv';
import { getAppEnv } from '../get-app-env';
import { Schema } from '../validation/schema.model';
import { Result, Err, Ok } from 'ts-results';

export const DEFAULT_CONFIG_FILENAME_SCHEME = 'config.{env}.json';

export class FileAndEnvConfig<
    TFileConfig extends object,
    TEnvConfig extends object,
> {
    constructor(
        public readonly configLoader: JsonAndEnvConfigLoader<
            TFileConfig,
            TEnvConfig
        >,
        public readonly file: TFileConfig,
        public readonly env: TEnvConfig,
    ) {}

    logEnv(): void {
        Object.keys(this.env).forEach((key) => {
            console.log(`Environment variable ${key} loaded`);
        });
    }

    logConfig(): void {
        console.log(
            `File Config${this.configLoader.jsonConfigLoader.key !== null ? ' for ' + this.configLoader.jsonConfigLoader.key : ''}`,
        );
        console.log(this.file);
    }
}

/**
 * A configuration object that holds both file-based and environment-based configurations,
 * and the key used to retrieve them
 *
 * If key is null, it indicates that the configuration lives at the root level of the
 * configuration file or that there is no environment prefix for the environment variables.
 */
export class JsonAndEnvConfigLoader<
    TJsonConfig extends object,
    TEnvConfig extends object,
> implements IConfigLoader<FileAndEnvConfig<TJsonConfig, TEnvConfig>> {
    constructor(
        public readonly jsonConfigLoader: JsonConfigLoader<TJsonConfig>,
        public readonly envConfigLoader: EnvConfigLoader<TEnvConfig>,
    ) {}

    async load(): Promise<
        Result<FileAndEnvConfig<TJsonConfig, TEnvConfig>, Error>
    > {
        const jsonResult = await this.jsonConfigLoader.load();
        if (jsonResult.err) {
            return Err(jsonResult.val);
        }
        const envResult = await this.envConfigLoader.load();
        if (envResult.err) {
            return Err(envResult.val);
        }
        return Ok(new FileAndEnvConfig(this, jsonResult.val, envResult.val));
    }
}

export interface IConfigLoader<T> {
    load(): Promise<Result<T, Error>>;
}

export class JsonConfigLoader<T> implements IConfigLoader<T> {
    constructor(
        public readonly key: string | null,
        public readonly fileSchema: Schema<T>,
        public readonly configFileDirectory: string,
        public readonly configFilenameScheme: string = DEFAULT_CONFIG_FILENAME_SCHEME,
    ) {}

    async load(): Promise<Result<T, Error>> {
        const appEnv = getAppEnv();
        const configFile = this.configFilenameScheme.replace('{env}', appEnv);
        const configPath = join(this.configFileDirectory, configFile);
        await access(configPath);
        const fileContent = await readFile(configPath, 'utf-8');
        let jsonConfig;
        if (this.key === null) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            jsonConfig = JSON.parse(fileContent);
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            jsonConfig = JSON.parse(fileContent)[this.key];
        }
        return this.fileSchema.parse(jsonConfig);
    }
}

export class EnvConfigLoader<T> implements IConfigLoader<T> {
    constructor(public readonly envSchema: Schema<T>) {}

    async load(): Promise<Result<T, Error>> {
        const appEnv = getAppEnv();
        const envFile = `.env.${appEnv}`;
        dotenv.config({ path: path.resolve(process.cwd(), envFile) });
        return await Promise.resolve(this.envSchema.parse(process.env));
    }
}
