import React from "react";
import { Chip } from "react-native-paper";
import { statusLabel, toUiStatus } from "../../core/constants/status";
import { ServiceRequestStatus } from "../../domain/entities/ServiceRequest";

interface StatusBadgeProps {
  status: ServiceRequestStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const uiStatus = toUiStatus(status);
  const color =
    uiStatus === "PENDING"
      ? "#f59e0b"
      : uiStatus === "IN_PROGRESS"
        ? "#0ea5e9"
        : uiStatus === "COMPLETED"
          ? "#16a34a"
          : "#ef4444";

  return (
    <Chip compact style={{ backgroundColor: `${color}22` }} textStyle={{ color }}>
      {statusLabel[uiStatus]}
    </Chip>
  );
}
