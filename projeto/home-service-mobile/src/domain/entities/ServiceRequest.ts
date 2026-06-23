export type ServiceRequestStatus = "OPEN" | "ASSIGNED" | "COMPLETED" | "CANCELLED";

export interface ServiceRequest {
  id: string;
  clientId: string;
  clientName: string;
  providerId: string | null;
  categoryId: string;
  title: string;
  description: string;
  status: ServiceRequestStatus;
  scheduledDate: string;
  estimatedPrice: number | null;
  finalPrice: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceRequestInput {
  clientId: string;
  categoryId: string;
  title: string;
  description: string;
  scheduledDate: string;
  estimatedPrice?: number;
}
