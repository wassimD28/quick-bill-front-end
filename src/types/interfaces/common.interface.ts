export interface MyLink{
  path: string;
  active: boolean;
  label: string;
}
export interface AccountFromProps{
  role: string;
}
export interface Account{
  name: string;
  email: string;
  address: string;
  phone: string;
  zipCode: string;
  city: string;
  country: string;
}