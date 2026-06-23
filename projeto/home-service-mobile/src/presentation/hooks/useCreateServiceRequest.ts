import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createServiceRequestUseCase } from "../../core/api/container";
import { queryKeys } from "../../core/constants/queryKeys";

export function useCreateServiceRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createServiceRequestUseCase.execute.bind(createServiceRequestUseCase),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.serviceRequests });
    }
  });
}
