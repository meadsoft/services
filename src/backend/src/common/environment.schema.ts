import zod from 'zod';

export const EnvironmentSchema = zod.object({
    NODE_ENV: zod.enum(['local', 'dev', 'prod', 'qa']).default('dev'),
    FIREBASE_API_KEY: zod.string(),
    FIREBASE_PROJECT_ID: zod.string(),
    FIREBASE_CLIENT_EMAIL: zod.string(),
    FIREBASE_PRIVATE_KEY: zod.string(),
});
export type EnvironmentConfig = zod.infer<typeof EnvironmentSchema>;
