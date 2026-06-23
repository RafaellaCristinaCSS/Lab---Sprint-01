import { useQuery } from "@tanstack/react-query";
import { getServiceRequestByIdUseCase } from "../../core/api/container";
import { queryKeys } from "../../core/constants/queryKeys";

export function useServiceRequestDetails(id: string) {
  return useQuery({
    queryKey: queryKeys.serviceRequestDetails(id),
    queryFn: () => getServiceRequestByIdUseCase.execute(id),
    enabled: Boolean(id),
    refetchInterval: 5000,
    staleTime: 2000
  });
}
