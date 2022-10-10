import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { TokenValidationGuard } from './guard/token-validation.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./protected/protected.module').then((m) => m.ProtectedModule),
    canActivate: [TokenValidationGuard],
    canLoad: [TokenValidationGuard],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
