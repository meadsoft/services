// auth/auth.service.ts
import { computed, Injectable, signal } from '@angular/core';
import {
    Auth,
    OAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    User,
    UserCredential,
} from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = signal<User | null>(null);
    isAuthenticated = computed(() => {
        return this.user() !== null;
    });

    constructor(private readonly auth: Auth) {
        onAuthStateChanged(this.auth, (user) => {
            this.user.set(user);
        });
    }

    async signInWithMicrosoft(): Promise<UserCredential> {
        return await this.signInWithProvider('microsoft.com');
    }

    async signInWithGoogle(): Promise<UserCredential> {
        return await this.signInWithProvider('google.com');
    }

    private async signInWithProvider(
        providerId: string,
    ): Promise<UserCredential> {
        const provider = new OAuthProvider(providerId);
        const userCredential = await signInWithPopup(this.auth, provider);
        return userCredential;
    }

    async signOut(): Promise<void> {
        await this.auth.signOut();
    }
}
