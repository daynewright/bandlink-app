import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/utils";
import { Row } from "@/types";

type GroupData = Row<"groups">[] | null;

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

    return {
      data: data as unknown as GroupData,
      error,
    };
  };

  return useCombinedQuery<GroupData>({
    queryKey,
    queryFn,
    enabled: !!userId,
  });
};
