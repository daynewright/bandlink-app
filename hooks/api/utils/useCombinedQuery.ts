import { PostgrestError, AuthError } from "@supabase/supabase-js";
import { QueryFunction, useQuery, QueryKey } from "@tanstack/react-query";

type Props<TData> = {
  queryKey: QueryKey;
  queryFn: QueryFunction<
    { data: TData | null; error: PostgrestError | AuthError | null },
    QueryKey,
    never
  >;
  enabled?: boolean;
};

export const useCombinedQuery = <TData>({
  queryKey,
  queryFn,
  enabled,
}: Props<TData>) => {
  const { data, error, ...rest } = useQuery({
    queryKey,
    queryFn,
    enabled,
  });

  return {
    data: data?.data,
    error: error ?? data?.error,
    ...rest,
  };
};
