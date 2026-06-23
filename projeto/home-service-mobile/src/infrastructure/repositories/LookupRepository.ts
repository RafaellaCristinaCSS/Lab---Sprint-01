import { ServiceCategory } from "../../domain/entities/ServiceCategory";
import { User } from "../../domain/entities/User";
import { ILookupRepository } from "../../domain/repositories/ILookupRepository";
import { fetchCategories, fetchUsers } from "../services/lookupApiService";

export class LookupRepository implements ILookupRepository {
  async getUsers(): Promise<User[]> {
    return fetchUsers();
  }

  async getCategories(): Promise<ServiceCategory[]> {
    return fetchCategories();
  }
}
