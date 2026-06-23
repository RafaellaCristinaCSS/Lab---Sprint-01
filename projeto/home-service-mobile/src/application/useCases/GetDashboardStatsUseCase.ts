import { toUiStatus } from "../../core/constants/status";
import { ServiceRequest } from "../../domain/entities/ServiceRequest";

export interface DashboardStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}

export class GetDashboardStatsUseCase {
  execute(requests: ServiceRequest[]): DashboardStats {
    const pending = requests.filter((request) => toUiStatus(request.status) === "PENDING").length;
    const inProgress = requests.filter(
      (request) => toUiStatus(request.status) === "IN_PROGRESS"
    ).length;
    const completed = requests.filter((request) => toUiStatus(request.status) === "COMPLETED").length;

    return {
      total: requests.length,
      pending,
      inProgress,
      completed
    };
  }
}
