import { PostgrestError, AuthError } from "@supabase/supabase-js";
import {
  MutationFunction,
  useMutation,
  MutationKey,
} from "@tanstack/react-query";

type Props<TData, TVariables> = {
  mutationKey: MutationKey;
  mutationFn: MutationFunction<
    { data: TData | null; error: PostgrestError | AuthError | null },
    TVariables
  >;
};

export const useCombinedMutation = <TData, TVariables>({
  mutationKey,
  mutationFn,
}: Props<TData, TVariables>) => {
  const { mutate, ...rest } = useMutation<
    { data: TData | null; error: PostgrestError | AuthError | null },
    PostgrestError | AuthError,
    TVariables
  >({
    mutationKey,
    mutationFn: async (variables: TVariables) => {
      const { data, error } = await mutationFn(variables);
      return { data, error };
    },
  });

  return {
    mutate,
    ...rest,
  };
};
