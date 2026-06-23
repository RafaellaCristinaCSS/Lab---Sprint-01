import { toUiStatus } from "../../core/constants/status";
import { ServiceRequest } from "../../domain/entities/ServiceRequest";

export interface DashboardStats {
  total: number;
  pending: number;
  completed: number;
}

export class GetDashboardStatsUseCase {
  execute(requests: ServiceRequest[]): DashboardStats {
    const pending = requests.filter((request) => toUiStatus(request.status) === "PENDING").length;
    const completed = requests.filter((request) => toUiStatus(request.status) === "COMPLETED").length;

    return {
      total: requests.length,
      pending,
      completed
    };
  }
}
