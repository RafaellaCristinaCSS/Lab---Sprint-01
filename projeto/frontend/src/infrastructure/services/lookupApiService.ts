import { ApiListResponse } from "../../core/types/api";
import { ServiceCategory } from "../../domain/entities/ServiceCategory";
import { User } from "../../domain/entities/User";
import { httpClient } from "./httpClient";

export async function fetchUsers(): Promise<User[]> {
  const { data } = await httpClient.get<ApiListResponse<User>>("/api/users");
  return data.data;
}

export async function fetchCategories(): Promise<ServiceCategory[]> {
  const { data } = await httpClient.get<ApiListResponse<ServiceCategory>>("/api/categories");
  return data.data;
}
