import { useQuery } from "@tanstack/react-query";

export function useCustomQueryHook(query, fn) {
  return useQuery({ queryKey: [query], queryFn: fn });
}
