export const queryKeys = {
  serviceRequests: ["serviceRequests"] as const,
  serviceRequestDetails: (id: string) => ["serviceRequestDetails", id] as const,
  users: ["users"] as const,
  categories: ["categories"] as const
};
