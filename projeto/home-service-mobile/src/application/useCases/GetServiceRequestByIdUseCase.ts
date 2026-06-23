import { ServiceRequest } from "../../domain/entities/ServiceRequest";
import { IServiceRequestRepository } from "../../domain/repositories/IServiceRequestRepository";

export class GetServiceRequestByIdUseCase {
  constructor(private readonly repository: IServiceRequestRepository) {}

  async execute(id: string): Promise<ServiceRequest> {
    return this.repository.getById(id);
  }
}
