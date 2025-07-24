export interface Account {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Plan {
  _id: string;
  name: string;
  price: string;
}

export interface City {
  _id: string;
  name: string;
}

export interface Order {
  _id: string;
  account: Account;
  plan: Plan | null;
  city: City;
  months: number;
  totalPaidAmount: number;
  razorpay_order_id: string;
  isSuccessPayment: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
}
