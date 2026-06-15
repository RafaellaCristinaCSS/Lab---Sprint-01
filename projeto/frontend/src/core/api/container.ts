import { CreateServiceRequestUseCase } from "../../application/useCases/CreateServiceRequestUseCase";
import { GetServiceRequestByIdUseCase } from "../../application/useCases/GetServiceRequestByIdUseCase";
import { GetServiceRequestsUseCase } from "../../application/useCases/GetServiceRequestsUseCase";
import { ServiceRequestRepository } from "../../infrastructure/repositories/ServiceRequestRepository";

const serviceRequestRepository = new ServiceRequestRepository();

export const getServiceRequestsUseCase = new GetServiceRequestsUseCase(serviceRequestRepository);
export const getServiceRequestByIdUseCase = new GetServiceRequestByIdUseCase(serviceRequestRepository);
export const createServiceRequestUseCase = new CreateServiceRequestUseCase(serviceRequestRepository);
