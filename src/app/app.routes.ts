import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./components/register/register.component').then(c => c.RegisterComponent),
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./components/login/login.component').then(c => c.LoginComponent),
    },
    {
        path: 'water-tracking/:id/daily',
        loadComponent: () =>
            import('./components/water-tracking/water-tracking.component').then(c => c.WaterTrackingComponent),
    },
    {
        path: 'water-tracking/:id/history',
        loadComponent: () =>
            import('./components/water-history/water-history.component').then(c => c.WaterHistoryComponent),
    },
];
