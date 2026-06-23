export const queryKeys = {
  serviceRequests: ["service-requests"] as const,
  serviceRequestDetails: (id: string) => ["service-requests", id] as const,
  users: ["users"] as const,
  categories: ["categories"] as const
};
