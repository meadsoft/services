import zod from 'zod';
import { Logger, Provider } from '@nestjs/common';
import { loadConfig } from 'src/common/load-config';

export const FIREBASE_CONFIG_KEY = 'firebase';
export const FirebaseConfigSchema = zod.object({
    // TODO: figure out if this is even needed
});
export type FirebaseConfig = zod.infer<typeof FirebaseConfigSchema>;

export const FIREBASE_CONFIG = 'FIREBASE_CONFIG_TOKEN';

export const provideFirebaseConfig: Provider = {
    provide: FIREBASE_CONFIG,
    useFactory: async (): Promise<FirebaseConfig> => {
        const settings = await loadConfig(
            FIREBASE_CONFIG_KEY,
            FirebaseConfigSchema,
        );
        return settings;
    },
};
