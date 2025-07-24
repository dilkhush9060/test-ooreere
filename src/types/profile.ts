export interface Profile {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  role: string;
  city: string;
  isSuspended: boolean;
  createdAt: string;
  updatedAt: string;
  picture?: string;
  companyname?: string;
  gstnumber?: string;
}
