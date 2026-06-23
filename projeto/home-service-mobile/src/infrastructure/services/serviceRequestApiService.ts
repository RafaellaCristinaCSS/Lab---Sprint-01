import { apiClient } from "../../core/api/apiClient";
import { ApiDataResponse, ApiListResponse, ApiMessageResponse } from "../../core/types/api";
import { CreateServiceRequestInput, ServiceRequest } from "../../domain/entities/ServiceRequest";

export async function fetchServiceRequests(): Promise<ServiceRequest[]> {
  const { data } = await apiClient.get<ApiListResponse<ServiceRequest>>("/service-requests");
  return data.data;
}

export async function fetchServiceRequestById(id: string): Promise<ServiceRequest> {
  const { data } = await apiClient.get<ApiDataResponse<ServiceRequest>>(`/service-requests/${id}`);
  return data.data;
}

export async function createServiceRequest(input: CreateServiceRequestInput): Promise<ServiceRequest> {
  const { data } = await apiClient.post<ApiMessageResponse<ServiceRequest>>("/service-requests", input);
  return data.data;
}
