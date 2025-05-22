import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "@angular/fire/auth-guard";
import {authGuard} from "./guards/auth.guard";

import { AngularFireAuthGuard, redirectUnauthorizedTo, hasCustomClaim } from '@angular/fire/compat/auth-guard';
import {InfoComponent} from "./info/info.component";

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const onlyAdmin = () => hasCustomClaim('admin');

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'info', component:InfoComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),canActivate:[authGuard],data: { authGuardPipe: onlyAdmin } },
  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
