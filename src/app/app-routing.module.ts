import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizerGuard } from './guards/authorizer.guard';

const routes: Routes = [
  {
    path: 'startLink',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthorizerGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: 'startLink',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
