import { Component, DefaultIterableDiffer, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Customer, CustomerColumns } from '../model/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent  {
  displayedColumns: string[] = CustomerColumns.map((col) => col.key);
  columnsSchema: any = CustomerColumns;
  dataSource = new MatTableDataSource<Customer>();
  valid: any = {};

  constructor(public dialog: MatDialog, private userService: CustomerService) {}

  ngOnInit() {
    this.userService.getCustomers().subscribe((res: any) => {
     
      this.dataSource.data = res;
    });
  }

  editRow(row: Customer) {
    if (row.customerId === 0) {
      this.userService.addCustomer(row).subscribe((newUser: Customer) => {
        row.customerId = newUser.customerId;
        row.isEdit = false;
      });
    } else {
      this.userService.updateCustomer(row).subscribe(() => (row.isEdit = false));
    }
  }

  addRow() {
    const newRow: Customer = {
      customerId: 0,
      customerName: '',
      phoneNumber: 0,
      isEdit: true,
     
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }

  removeRow(id: number) {
    
    this.userService.deleteCustomer(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: Customer) => u.customerId !== id
      );
    });
  }



  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false);
    }
    return false;
  }

}
