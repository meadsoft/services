import { FirebaseOptions } from '@angular/fire/app';

export interface Environment {
    production: boolean;
    apiBaseUrl: string;
    firebase: FirebaseOptions;
}
