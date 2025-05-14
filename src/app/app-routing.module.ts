import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { LicenseComponent } from './features/license/license.component';
import { AuthGuard } from './features/auth/guards/auth.guard';

const authModule = () => import('./features/auth/auth.module').then(m => m.AuthModule);
const licenseModule = () => import('./features/license/license.module').then(m => m.LicenseModule);
const routes: Routes = [
  { path: '', loadChildren: authModule, component: LoginComponent },
  { path: 'license', loadChildren: licenseModule, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
