import { useQuery } from "@tanstack/react-query";
import { getServiceRequestsUseCase } from "../../core/api/container";
import { queryKeys } from "../../core/constants/queryKeys";

export function useServiceRequests() {
  return useQuery({
    queryKey: queryKeys.serviceRequests,
    queryFn: () => getServiceRequestsUseCase.execute(),
    refetchInterval: 5000,
    staleTime: 2000
  });
}
