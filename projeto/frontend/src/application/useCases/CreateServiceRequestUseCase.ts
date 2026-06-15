import { CreateServiceRequestInput, ServiceRequest } from "../../domain/entities/ServiceRequest";
import { IServiceRequestRepository } from "../../domain/repositories/IServiceRequestRepository";

export class CreateServiceRequestUseCase {
  constructor(private readonly repository: IServiceRequestRepository) {}

  async execute(input: CreateServiceRequestInput): Promise<ServiceRequest> {
    return this.repository.create(input);
  }
}
