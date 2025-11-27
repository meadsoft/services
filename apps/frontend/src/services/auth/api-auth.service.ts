// auth/api-auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/models/User';

@Injectable({ providedIn: 'root' })
export class ApiAuthService {
    constructor(private http: HttpClient) {}

    async exchangeFirebaseToken(idToken: string): Promise<User> {
        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${idToken}`,
        );
        return await firstValueFrom(
            this.http.post<User>(
                `${environment.apiBaseUrl}/auth/firebase-login`,
                null,
                {
                    headers,
                },
            ),
        );
    }

    async logout(): Promise<void> {
        await firstValueFrom(
            this.http.post(`${environment.apiBaseUrl}/auth/logout`, null),
        );
    }

    async getCurrentUser(): Promise<User> {
        return await firstValueFrom(
            this.http.post<User>(`${environment.apiBaseUrl}/auth/me`, null),
        );
    }
}
