import { PostgrestError } from "@supabase/supabase-js";
import { QueryFunction, useQuery } from "@tanstack/react-query";

type Props = {
  queryKey: (string | undefined)[];
  queryFn:
    | QueryFunction<
        | {
            data: any[] | null;
            error: PostgrestError | null;
          }
        | {
            data: null;
            error: unknown;
          },
        (string | undefined)[],
        never
      >
    | undefined;
  enabled?: boolean;
};
// Returns react-query & supabase data/errors //
export const useCombinedQuery = ({ queryKey, queryFn, enabled }: Props) => {
  const { data, error, ...rest } = useQuery({ queryKey, queryFn, enabled });

  return {
    data: data?.data,
    error: error ?? data?.error,
    ...rest,
  };
};
