import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';

const authModule = () => import('./auth/auth.module').then(m => m.AuthModule);
const licenseModule = () => import('./license/license.module').then(m => m.LicenseModule);
const routes: Routes = [
  { path: '', loadChildren: authModule, component: LoginComponent },
  { path: 'license', loadChildren: licenseModule, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
