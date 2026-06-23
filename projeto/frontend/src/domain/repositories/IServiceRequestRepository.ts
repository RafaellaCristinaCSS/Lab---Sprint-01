import { CreateServiceRequestInput, ServiceRequest } from "../entities/ServiceRequest";

export interface IServiceRequestRepository {
  getAll(): Promise<ServiceRequest[]>;
  getById(id: string): Promise<ServiceRequest>;
  create(input: CreateServiceRequestInput): Promise<ServiceRequest>;
}
