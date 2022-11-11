import { Component, DefaultIterableDiffer, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Invoice, InvoiceColumns } from '../model/invoice';
import { InvoiceService } from '../services/invoice.service';
import { Customer, CustomerColumns } from '../model/customer';
import { CustomerService } from '../services/customer.service';
import {MatSelectModule,MatSelectChange} from '@angular/material/select';
interface dataCustomer {
  customerId: number;
  customerName: string;
}

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent  {
  displayedColumns: string[] = InvoiceColumns.map((col) => col.key);
  columnsSchema: any = InvoiceColumns;
  dataSource = new MatTableDataSource<Invoice>();
  dataCustomers:dataCustomer[]=[];
  valid: any = {};
  selectedcustomers = [];
  constructor(public dialog: MatDialog, private userService: InvoiceService, private customerService: CustomerService) {}

  ngOnInit() {
    this.userService.getInvoices().subscribe((res: any) => {
     
      this.dataSource.data = res;
    });
    this.customerService.getCustomers().subscribe((res: any) => {
     
      this.dataCustomers = res;
    });
  }
  getcustomer(id: number) {
    
    this.customerService.getCustomer(id).subscribe((newUser: dataCustomer) => {
       return newUser.customerName;
    });
  }
  editRow(row: Invoice) {
    if (row.invoiceId === 0) {
      this.userService.addInvoice(row).subscribe((newUser: Invoice) => {
        row.invoiceId = newUser.invoiceId;
        row.isEdit = false;
        this.userService.getInvoices().subscribe((res: any) => {
     
          this.dataSource.data = res;
        });
      });
    } else {
      this.userService.updateInvoice(row).subscribe(() => {
        row.isEdit = false
        this.userService.getInvoices().subscribe((res: any) => {
     
          this.dataSource.data = res;
        });
      });
    }
  }

  addRow() {
    const newRow: Invoice = {
      invoiceId: 0,
      invoiceDate: '',
      value: 0,
      customerId:0,
      state:0,
      customer:{ customerId: 0,
        customerName: '',
        phoneNumber: 0,
        isEdit: true,},
      isEdit: true,

     
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }

  removeRow(id: number) {
    
    this.userService.deleteInvoice(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: Invoice) => u.invoiceId !== id
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
