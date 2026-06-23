import { ServiceRequestStatus } from "../../domain/entities/ServiceRequest";

export type UiStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export function toUiStatus(status: ServiceRequestStatus): UiStatus {
  if (status === "OPEN") {
    return "PENDING";
  }

  if (status === "ASSIGNED") {
    return "IN_PROGRESS";
  }

  if (status === "COMPLETED") {
    return "COMPLETED";
  }

  return "CANCELLED";
}

export const statusLabel: Record<UiStatus, string> = {
  PENDING: "Pendente",
  IN_PROGRESS: "Em andamento",
  COMPLETED: "Concluida",
  CANCELLED: "Cancelada"
};
