import { Component, Input, OnInit } from '@angular/core';
import { differenceInDays } from 'date-fns';
import { generateAndSend, generateLicense, generateMultipleLicenses } from '../store/license.actions';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { GenerateLicenseDialogComponent } from '../generate-license-dialog/generate-license-dialog.component';
import { AppState } from 'src/app/app.store';
import { Customer, CustomerService, Order } from 'src/app/services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { getSelectedCustomer } from '../store/license.selectors';
import { SelectionModel } from '@angular/cdk/collections';
import { SendLicenseDialogComponent, SendLicenseDialogData } from '../send-license-dialog/send-license-dialog-component';


@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})

export class OrdersTableComponent implements OnInit {
  displayedColumns: string[] = ['select', 'orderId', 'product', 'company', 'actions'];
  dataSource = new MatTableDataSource<Order>();
  selection = new SelectionModel<Order>(true, []);

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private customerService: CustomerService) {
    this.dataSource.filterPredicate = (data: Order, filter: string) => {
      const searchTerm = filter.trim().toLowerCase();

      const dataStr =
        data.iD_Order.toString() + ' ' +
        data.product.product_Name + ' ' +
        data.order_RegistrationContent?.company;

      return dataStr.toLowerCase().includes(searchTerm);
    }
  }

    ngOnInit(): void {
      this.store.select(getSelectedCustomer).subscribe({
        next: (data: Customer | null) => {
          this.loadOrders(data?.iD_Customer);
        }
      });
    }

    loadOrders(customerId: number | undefined) {
      if (!customerId) {
        return;
      }
      this.customerService.getCustomerOrders(customerId).subscribe({
        next: (data: Order[]) => {
          this.dataSource.data = data;
        },
        error: (err: any) => console.error('Error loading customer orders', err)
      });
    }

    getDaysLeft(expirationDate: string): number {
      return differenceInDays(new Date(expirationDate), new Date());
    }

    getBase64(rawBase64: string) {
      return 'data:image/jpeg;base64,' + rawBase64;
    }

    onGenerate(order: Order) {
      const dialogRef = this.dialog.open(GenerateLicenseDialogComponent, {
        data: {
          product: order.product.product_Name,
          userName: order.order_RegistrationContent.userName,
          numDays: order.order_RegistrationContent.daysExpiration,
          company: order.order_RegistrationContent.company,
        }
      });

      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(generateLicense({ order: order }));
        }
      });
    }

    onGenerateSelected() {
      this.store.dispatch(generateMultipleLicenses({ orders: this.selection.selected }));
      this.selection.clear();
    }

    onSendSelected() {
      var userEmail: string | undefined = "test@gmail.com";
      this.store.select(getSelectedCustomer).subscribe({
        next: (data: Customer | null) => {
          userEmail = data?.customer_Email;
        }
      });

      const dialogRef = this.dialog.open<SendLicenseDialogComponent, SendLicenseDialogData, SendLicenseDialogData>(
        SendLicenseDialogComponent,
        {
          width: '400px',
          data: { email: userEmail, numDays:  this.dataSource.data[0]?.order_RegistrationContent?.daysExpiration }
        }
      );

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.store.dispatch(generateAndSend({ orders: this.selection.selected, emails: [result.email], numDays: result.numDays }));
          this.selection.clear();
        }
      });
    }

    toggleAllRows() {
      if (this.isAllSelected()) {
        this.selection.clear();
      } else {
        this.selection.select(...this.dataSource.data);
      }
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
      this.dataSource.filter = filterValue;
    }

    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    toggleRow(row: any) {
      this.selection.toggle(row);
    }
  }