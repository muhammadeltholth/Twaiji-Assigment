import { Customer } from '../model/customer';
export interface Invoice {
    invoiceId: number;
    invoiceDate: string;
    value: number;
    state:number;
    customerId:number;
    customer:Customer;
    isEdit: boolean;
  
  }
  
  export const InvoiceColumns = [
    {
      key: 'invoiceDate',
      type: 'date',
      label: 'invoice Date',
     
    },
    {
      key: 'value',
      type: 'text',
      label: 'value',
    },{
        key: 'customerId',
        type: 'select',
        label: 'customerId',
        cascade:'customer',
        value:'customerName'
      },
    {
        key: 'state',
        type: 'checkbox',
        label: 'state',
      },
    {
      key: 'isEdit',
      type: 'isEdit',
      label: '',
    },
  ];
  