import { CreateServiceRequestInput, ServiceRequest } from "../../domain/entities/ServiceRequest";
import { IServiceRequestRepository } from "../../domain/repositories/IServiceRequestRepository";
import {
  createServiceRequest,
  fetchServiceRequestById,
  fetchServiceRequests
} from "../services/serviceRequestApiService";

export class ServiceRequestRepository implements IServiceRequestRepository {
  async getAll(): Promise<ServiceRequest[]> {
    return fetchServiceRequests();
  }

  async getById(id: string): Promise<ServiceRequest> {
    return fetchServiceRequestById(id);
  }

  async create(input: CreateServiceRequestInput): Promise<ServiceRequest> {
    return createServiceRequest(input);
  }
}
