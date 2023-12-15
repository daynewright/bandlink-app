import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/utils";
import { FunctionsRPC } from "@/types";

export const useGetDirectMessagesByConversationId = (
  conversationsId?: string,
  pageNumber = 1,
  itemsPerPage = 10
) => {
  const queryKey = ["messages", "direct", conversationsId];

  const queryFn = async () => {
    const { data, error } = await supabase.rpc(
      "get_messages_for_conversation_user",
      {
        p_conversation_id: conversationsId,
        p_page_number: pageNumber,
        p_items_per_page: itemsPerPage,
      }
    );

    return { data, error };
  };

  return useCombinedQuery<FunctionsRPC<"get_messages_for_conversation_user">>({
    queryKey,
    queryFn,
    enabled: !!conversationsId,
  });
};
