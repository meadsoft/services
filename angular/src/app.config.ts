import {
    ApplicationConfig,
    provideBrowserGlobalErrorListeners,
    provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { googleAuthProviders } from './services/auth/google-auth.providers';
import {
    provideClientHydration,
    withEventReplay,
} from '@angular/platform-browser';
import { primeNgThemeProvider } from './theme.config';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideClientHydration(withEventReplay()),
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        primeNgThemeProvider,
        // ...googleAuthProviders,
    ],
};
