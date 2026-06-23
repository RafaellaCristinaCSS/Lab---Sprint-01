import { CreateServiceRequestUseCase } from "../../application/useCases/CreateServiceRequestUseCase";
import { GetCategoriesUseCase } from "../../application/useCases/GetCategoriesUseCase";
import { GetServiceRequestByIdUseCase } from "../../application/useCases/GetServiceRequestByIdUseCase";
import { GetServiceRequestsUseCase } from "../../application/useCases/GetServiceRequestsUseCase";
import { GetUsersUseCase } from "../../application/useCases/GetUsersUseCase";
import { LookupRepository } from "../../infrastructure/repositories/LookupRepository";
import { ServiceRequestRepository } from "../../infrastructure/repositories/ServiceRequestRepository";

const serviceRequestRepository = new ServiceRequestRepository();
const lookupRepository = new LookupRepository();

export const getServiceRequestsUseCase = new GetServiceRequestsUseCase(serviceRequestRepository);
export const getServiceRequestByIdUseCase = new GetServiceRequestByIdUseCase(serviceRequestRepository);
export const createServiceRequestUseCase = new CreateServiceRequestUseCase(serviceRequestRepository);
export const getUsersUseCase = new GetUsersUseCase(lookupRepository);
export const getCategoriesUseCase = new GetCategoriesUseCase(lookupRepository);
