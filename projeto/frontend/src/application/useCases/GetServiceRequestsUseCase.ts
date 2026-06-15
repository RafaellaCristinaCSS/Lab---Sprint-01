import { ServiceRequest } from "../../domain/entities/ServiceRequest";
import { IServiceRequestRepository } from "../../domain/repositories/IServiceRequestRepository";

export class GetServiceRequestsUseCase {
  constructor(private readonly repository: IServiceRequestRepository) {}

  async execute(): Promise<ServiceRequest[]> {
    return this.repository.getAll();
  }
}
