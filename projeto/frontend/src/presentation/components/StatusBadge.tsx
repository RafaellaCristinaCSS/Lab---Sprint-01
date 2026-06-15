import { statusLabel, toUiStatus } from "../../core/constants/status";
import { ServiceRequestStatus } from "../../domain/entities/ServiceRequest";

interface StatusBadgeProps {
  status: ServiceRequestStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const uiStatus = toUiStatus(status);

  return (
    <span className={`status status--${uiStatus.toLowerCase()}`}>
      {statusLabel[uiStatus]}
    </span>
  );
}
