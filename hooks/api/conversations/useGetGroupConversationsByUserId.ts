import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/utils";
import { FunctionsRPC } from "@/types";

export const useGetGroupConversationsByUserId = (userId?: string) => {
  const queryKey = ["conversations", "groups", "user", userId];

  const queryFn = async () => {
    const { data, error } = await supabase.rpc(
      "get_group_conversations_by_user_id",
      {
        p_user_id: userId,
      }
    );

    return { data, error };
  };

  return useCombinedQuery<FunctionsRPC<"get_group_conversations_by_user_id">>({
    queryKey,
    queryFn,
    enabled: !!userId,
  });
};
