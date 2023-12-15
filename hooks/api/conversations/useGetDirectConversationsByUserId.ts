import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/utils";
import { FunctionsRPC } from "@/types";

export const useGetDirectConversationsByUserId = (userId?: string) => {
  const queryKey = ["conversations", "direct", "user", userId];

  const queryFn = async () => {
    const { data, error } = await supabase.rpc("get_conversations_for_user", {
      p_user_id: userId,
    });

    return { data, error };
  };

  return useCombinedQuery<FunctionsRPC<"get_conversations_for_user">>({
    queryKey,
    queryFn,
    enabled: !!userId,
  });
};
