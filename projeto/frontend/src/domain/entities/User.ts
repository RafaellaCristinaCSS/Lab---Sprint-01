export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: "CLIENT" | "PROVIDER";
  address: string;
  city: string;
  state: string;
  createdAt: string;
  updatedAt: string;
}
