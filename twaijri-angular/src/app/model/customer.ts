export interface Customer {
  customerId: number;
  customerName: string;
  phoneNumber: number;
  isEdit: boolean;

}

export const CustomerColumns = [
  {
    key: 'customerName',
    type: 'text',
    label: 'Customer Name',
    required: true,
  },
  {
    key: 'phoneNumber',
    type: 'text',
    label: 'Phone Number',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
