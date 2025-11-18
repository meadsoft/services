import zod from 'zod';
import { Injectable, Logger, Provider } from '@nestjs/common';
import { loadConfig } from '@meadsoft/common/load-config';
import { EMAIL_REGEX } from '@meadsoft/common/regex';

export const FIREBASE_CONFIG_KEY = 'firebase';

@Injectable()
export class FirebaseConfig {
    type: string;
    project_id: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
    universe_domain: string;
    /** # secret value. store in .env not in json */
    privateKeyId?: string;
    /** # secret value. store in .env not in json */
    privateKey?: string;
}

export class FirebaseEnvironmentConfig {
    FIREBASE_PRIVATE_KEY_ID: string;
    FIREBASE_PRIVATE_KEY: string;
}

export const FirebaseConfigSchema = zod.object({
    type: zod.string(),
    project_id: zod.string(),
    client_email: zod.string().regex(EMAIL_REGEX),
    client_id: zod.string(),
    auth_uri: zod.string(),
    token_uri: zod.string(),
    auth_provider_x509_cert_url: zod.string(),
    client_x509_cert_url: zod.string(),
    universe_domain: zod.string(),
    privateKeyId: zod.string().optional(),
    privateKey: zod.string().optional(),
}) satisfies zod.ZodType<FirebaseConfig>;

export const FirebaseEnvironmentConfigSchema = zod.object({
    FIREBASE_PRIVATE_KEY_ID: zod.string().min(1),
    FIREBASE_PRIVATE_KEY: zod.string().min(1),
}) satisfies zod.ZodType<FirebaseEnvironmentConfig>;

export const FirebaseConfigProvider: Provider = {
    provide: FirebaseConfig,
    useFactory: async (): Promise<FirebaseConfig> => {
        const settings = await loadConfig<
            FirebaseConfig,
            FirebaseEnvironmentConfig
        >(
            FIREBASE_CONFIG_KEY,
            FirebaseConfigSchema,
            FirebaseEnvironmentConfigSchema,
        );
        const { config, env } = settings;
        const finalConfig = {
            ...config,
            privateKeyId: env.FIREBASE_PRIVATE_KEY_ID,
            privateKey: env.FIREBASE_PRIVATE_KEY,
        };
        return finalConfig;
    },
};
