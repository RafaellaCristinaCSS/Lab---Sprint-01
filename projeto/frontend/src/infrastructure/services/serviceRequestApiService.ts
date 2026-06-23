import { ApiDataResponse, ApiListResponse, ApiMessageResponse } from "../../core/types/api";
import { CreateServiceRequestInput, ServiceRequest } from "../../domain/entities/ServiceRequest";
import { httpClient } from "./httpClient";

export async function fetchServiceRequests(): Promise<ServiceRequest[]> {
  const { data } = await httpClient.get<ApiListResponse<ServiceRequest>>("/service-requests");
  return data.data;
}

export async function fetchServiceRequestById(id: string): Promise<ServiceRequest> {
  const { data } = await httpClient.get<ApiDataResponse<ServiceRequest>>(`/service-requests/${id}`);
  return data.data;
}

export async function createServiceRequest(input: CreateServiceRequestInput): Promise<ServiceRequest> {
  const { data } = await httpClient.post<ApiMessageResponse<ServiceRequest>>("/service-requests", input);
  return data.data;
}
