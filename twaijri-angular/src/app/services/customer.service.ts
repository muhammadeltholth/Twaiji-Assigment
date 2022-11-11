import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Customer } from '../model/customer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private serviceUrl = 'https://localhost:44366/api/customers';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http
      .get(this.serviceUrl)
      .pipe<Customer[]>(map((data: any) => data));
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.serviceUrl}/${customer.customerId}`, customer);
  }

 getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.serviceUrl}/${id}`);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.serviceUrl}`, customer);
  }

  deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${this.serviceUrl}/${id}`);
  }

  deleteCustomers(customers: Customer[]): Observable<Customer[]> {
    return forkJoin(
      customers.map((customer) =>
        this.http.delete<Customer>(`${this.serviceUrl}/${customer.customerId}`)
      )
    );
  }
}
