import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "@angular/fire/auth-guard";
import {authGuard} from "./guards/auth.guard";

import { AngularFireAuthGuard, redirectUnauthorizedTo, hasCustomClaim } from '@angular/fire/compat/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const onlyAdmin = () => hasCustomClaim('admin');

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),canActivate:[authGuard],data: { authGuardPipe: onlyAdmin } }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
