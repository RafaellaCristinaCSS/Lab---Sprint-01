import { useQueries } from "@tanstack/react-query";
import { queryKeys } from "../../core/constants/queryKeys";
import { fetchCategories, fetchUsers } from "../../infrastructure/services/lookupApiService";

export function useLookups() {
  const [usersQuery, categoriesQuery] = useQueries({
    queries: [
      {
        queryKey: queryKeys.users,
        queryFn: fetchUsers,
        staleTime: 60000
      },
      {
        queryKey: queryKeys.categories,
        queryFn: fetchCategories,
        staleTime: 60000
      }
    ]
  });

  return {
    usersQuery,
    categoriesQuery
  };
}
