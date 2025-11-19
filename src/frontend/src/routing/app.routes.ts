import { Routes } from '@angular/router';
import { LoginComponent } from 'src/components/auth/login/login.component';
import { LandingPageComponent } from 'src/components/landing-page/landing-page.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        canActivate: [AuthGuard],
        component: LandingPageComponent,
    },
    { path: '홈', redirectTo: '/' },
    { path: '**', redirectTo: '/' },
];
