import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../core/constants/queryKeys";
import { getServiceRequestsUseCase } from "../../core/api/container";

export function useServiceRequests() {
  return useQuery({
    queryKey: queryKeys.serviceRequests,
    queryFn: () => getServiceRequestsUseCase.execute(),
    refetchInterval: 5000,
    staleTime: 2000
  });
}
