import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
    providedIn: 'root',
})
export class GoogleAuthService {
    constructor(
        @Inject(PLATFORM_ID) protected platformId: Object,
        private firebaseAuth: AngularFireAuth
    ) {}

    loadGoogleAuthScript() {
        // if (isPlatformBrowser(this.platformId) == false) {
        //     console.log(
        //         'Not running in browser, aborting loading Google Auth script'
        //     );
        //     return;
        // }
        // const script = document.createElement('script');
        // script.src = 'https://accounts.google.com/gsi/client';
        // script.async = true;
        // document.head.appendChild(script);
        // (window as any).handleCredentialResponse = (response: any) => {
        //     console.log(response);
        //     // const data: any = jwtDecode(response.credential);
        //     // this.email = data.email;
        // };
    }

    async logInWithRedirect() {
        const provider = new GoogleAuthProvider();
        await this.firebaseAuth.signInWithRedirect(provider).then((result) => {
            console.log(result);
        });
    }
}
