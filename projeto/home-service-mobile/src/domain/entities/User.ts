export type UserType = "CLIENT" | "PROVIDER";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  address: string;
  city: string;
  state: string;
  createdAt: string;
  updatedAt: string;
}
