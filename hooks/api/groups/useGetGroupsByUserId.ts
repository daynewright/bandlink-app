import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/utils";
import { Row } from "@/types";

type GroupData = Partial<Row<"groups">>[] | null | undefined;

type QueryFnReturn = Promise<{
  data: GroupData;
  error: any;
}>;

export const useGetGroupsByUserId = (userId?: string) => {
  const queryKey = ["groups", "user", userId];

  const queryFn = async (): QueryFnReturn => {
    const { data, error } = await supabase
      .from("users_groups")
      .select(
        `
          groups (
            id,
            group_name
          )
        `
      )
      .eq("user_id", userId);

    const flatGroups = data?.flatMap((g) => g.groups);

    return {
      data: flatGroups,
      error,
    };
  };

  return useCombinedQuery<GroupData>({
    queryKey,
    queryFn,
    enabled: !!userId,
  });
};
