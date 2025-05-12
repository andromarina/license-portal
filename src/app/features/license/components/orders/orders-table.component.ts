import { Component } from '@angular/core';
import { differenceInDays } from 'date-fns';
import { renewLicense } from '../../license.actions';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { RenewLicenseDialogComponent } from '../renew-license-dialog/renew-license-dialog.component';
import { AppState } from 'src/app/app.store';

export interface Order {
  orderDate: string;
  product: string;
  expirationDate: string;
}

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent {
  displayedColumns: string[] = ['orderDate', 'product', 'expirationDate', 'daysLeft', 'actions'];
  constructor(
    private dialog: MatDialog, 
    private store: Store<AppState>) 
    {}

  orders: Order[] = [
    { orderDate: '2024-11-01', product: 'Smart Thermostat', expirationDate: '2025-11-01' },
    { orderDate: '2024-10-15', product: 'Heat Pump X1', expirationDate: '2025-10-15' },
    { orderDate: '2024-08-20', product: 'Floor Heater Pro', expirationDate: '2025-08-20' },
    { orderDate: '2024-06-01', product: 'Radiator Basic', expirationDate: '2025-06-01' },
    { orderDate: '2024-05-10', product: 'ViCare Control', expirationDate: '2025-05-10' },
    { orderDate: '2024-03-18', product: 'Solar Panel Kit', expirationDate: '2025-03-18' },
    { orderDate: '2023-12-25', product: 'Gas Heater GX', expirationDate: '2024-12-25' },
    { orderDate: '2023-10-03', product: 'Wireless Sensor', expirationDate: '2024-10-03' },
    { orderDate: '2023-07-19', product: 'Energy Meter', expirationDate: '2024-07-19' },
    { orderDate: '2023-05-05', product: 'Indoor Climate Hub', expirationDate: '2024-05-05' }
  ];

  getDaysLeft(expirationDate: string): number {
    return differenceInDays(new Date(expirationDate), new Date());
  }

  onRenew(order: Order) {
    console.log(this.dialog);
    const dialogRef = this.dialog.open(RenewLicenseDialogComponent, {
      data: {
        product: order.product,
        price: 99,
        period: '1 year'
      }
    });
  
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(renewLicense({ product: order.product }));
      }
    });
  }
}