import { useQueries } from "@tanstack/react-query";
import { getCategoriesUseCase, getUsersUseCase } from "../../core/api/container";
import { queryKeys } from "../../core/constants/queryKeys";

export function useLookups() {
  const [usersQuery, categoriesQuery] = useQueries({
    queries: [
      {
        queryKey: queryKeys.users,
        queryFn: () => getUsersUseCase.execute(),
        staleTime: 60000
      },
      {
        queryKey: queryKeys.categories,
        queryFn: () => getCategoriesUseCase.execute(),
        staleTime: 60000
      }
    ]
  });

  return {
    usersQuery,
    categoriesQuery
  };
}
