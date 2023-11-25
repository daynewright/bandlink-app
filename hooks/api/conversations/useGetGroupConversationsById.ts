import { supabase } from "@/clients/supabase";
import { useGetLoggedInProfile } from "@/hooks/api/profiles/useGetLoggedInProfile";
import { useCombinedQuery } from "../useCombinedQuery";

export const useGetGroupConversationsById = (
  groupId: string,
  conversationId: string
) => {
  const { data } = useGetLoggedInProfile();

  const queryKey = ["groups", groupId, "conversations", conversationId];

  const queryFn = async () => {
    return await supabase.rpc("", {
      p_user_id: data?.id,
    });
  };

  return useCombinedQuery({ queryKey, queryFn });
};
