import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService, Customer } from '../../services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { selectCustomer } from '../store/license.actions';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'organization'];
  dataSource = new MatTableDataSource<Customer>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private customerService: CustomerService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next: (data: Customer[]) => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
      },
      error: (err: any) => console.error('Error loading customers', err)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onRowClicked(customer: Customer): void {
    console.log('Clicked row:', customer);
    this.store.dispatch(selectCustomer({ customer }));
  }
}
