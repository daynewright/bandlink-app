import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/useCombinedQuery";
import { Row } from "@/types";

export const useGetGroupsByUserId = (userId?: string) => {
  const queryKey = ["groups", userId];

  const queryFn = async () => {
    return await supabase
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
  };

  return useCombinedQuery({ queryKey, queryFn, enabled: !!userId });
};
