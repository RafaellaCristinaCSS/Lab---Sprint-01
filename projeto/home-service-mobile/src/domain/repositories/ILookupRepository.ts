import { ServiceCategory } from "../entities/ServiceCategory";
import { User } from "../entities/User";

export interface ILookupRepository {
  getUsers(): Promise<User[]>;
  getCategories(): Promise<ServiceCategory[]>;
}
