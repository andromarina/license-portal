import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LicenseRoutingModule } from './license-routing.module';
import { LicenseComponent } from './license.component';
import { OrdersTableComponent } from './orders/orders-table.component';
import { GenerateLicenseDialogComponent } from './generate-license-dialog/generate-license-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { CustomerTableComponent } from 'src/app/license/customer-table/customer-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StoreModule } from '@ngrx/store';
import { customerReducer } from './store/license.reducer';
import { LicenseEffects } from './store/license.effects';
import { EffectsModule } from '@ngrx/effects';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  declarations: [
    LicenseComponent,
    OrdersTableComponent,
    CustomerTableComponent,
    GenerateLicenseDialogComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    MatSortModule,
    MatFormFieldModule,
    MatTableModule,
    MatCardModule,
    CdkTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    LicenseRoutingModule,
    StoreModule.forFeature('customer', customerReducer),
    EffectsModule.forFeature([LicenseEffects])
  ]
})
export class LicenseModule { }
