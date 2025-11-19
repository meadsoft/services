import { FirebaseApp, initializeApp } from 'firebase/app';
import { Analytics, getAnalytics } from '@firebase/analytics';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class FirebaseService {
    app?: FirebaseApp;
    analytics?: Analytics;

    initialize() {
        this.app = initializeApp(environment.firebase);
        this.analytics = getAnalytics(this.app);
    }
}
