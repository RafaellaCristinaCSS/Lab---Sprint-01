import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../core/constants/queryKeys";
import { getServiceRequestByIdUseCase } from "../../core/api/container";

export function useServiceRequestDetails(id: string) {
  return useQuery({
    queryKey: queryKeys.serviceRequestDetails(id),
    queryFn: () => getServiceRequestByIdUseCase.execute(id),
    enabled: Boolean(id),
    refetchInterval: 5000,
    staleTime: 2000
  });
}
