// auth/jwt.interceptor.ts
import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class HttpCookieCredentialsInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        // Only add withCredentials for requests to your API
        if (req.url.startsWith(environment.apiBaseUrl)) {
            const authReq = req.clone({
                withCredentials: true, // Sends HTTP-only cookies automatically
            });
            return next.handle(authReq);
        }
        return next.handle(req);
    }
}
