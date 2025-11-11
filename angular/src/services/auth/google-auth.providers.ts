import { EnvironmentProviders, inject } from '@angular/core';
import {
    FirebaseApp,
    initializeApp,
    provideFirebaseApp,
} from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { firebaseConfig } from './google-auth.config';

export const googleAuthProviders: EnvironmentProviders[] = [
    // provideFirebaseApp(() => initializeApp(firebaseConfig)),
    // provideAuth(() => {
    //     const firebaseApp = inject(FirebaseApp);
    //     return getAuth(firebaseApp);
    // }),
];
