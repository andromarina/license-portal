import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicenseRoutingModule } from './license-routing.module';
import { LicenseComponent } from './license.component';
import { LicenseDashboardComponent } from './pages/license-dashboard/license-dashboard.component';
import { LicenseCardComponent } from './components/license-card/license-card.component';


@NgModule({
  declarations: [
    LicenseComponent,
    LicenseDashboardComponent,
    LicenseCardComponent
  ],
  imports: [
    CommonModule,
    LicenseRoutingModule
  ]
})
export class LicenseModule { }
