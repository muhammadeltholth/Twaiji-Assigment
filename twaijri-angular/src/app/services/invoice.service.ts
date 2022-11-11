import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Invoice } from '../model/invoice';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private serviceUrl = 'https://localhost:44366/api/invoices';

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this.http
      .get(this.serviceUrl)
      .pipe<Invoice[]>(map((data: any) => data));
  }

  updateInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(`${this.serviceUrl}/${invoice.invoiceId}`, invoice);
  }

  addInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.serviceUrl}`, invoice);
  }

  deleteInvoice(id: number): Observable<Invoice> {
    return this.http.delete<Invoice>(`${this.serviceUrl}/${id}`);
  }

  deleteInvoices(invoices: Invoice[]): Observable<Invoice[]> {
    return forkJoin(
      invoices.map((invoice) =>
        this.http.delete<Invoice>(`${this.serviceUrl}/${invoice.invoiceId}`)
      )
    );
  }
}
