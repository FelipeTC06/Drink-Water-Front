import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./components/register/register.component').then(c => c.RegisterComponent),
    },
];
