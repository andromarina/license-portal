import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LicenseRoutingModule } from './license-routing.module';
import { LicenseComponent } from './license.component';
import { OrdersTableComponent } from './components/orders/orders-table.component';
import { RenewLicenseDialogComponent } from './components/renew-license-dialog/renew-license-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    LicenseComponent,
    OrdersTableComponent,
    RenewLicenseDialogComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    LicenseRoutingModule
  ]
})
export class LicenseModule { }
