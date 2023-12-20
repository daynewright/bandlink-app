import { supabase } from "@/clients/supabase";
import { useCombinedMutation } from "@/hooks/api/utils";

export const useAddMessageByConversationId = (conversationId?: string) => {
  const mutationKey = ["messages", conversationId];

  const mutationFn = async (variables: {
    conversationId?: string;
    userId?: string;
    message?: string;
  }) => {
    const { data, error } = await supabase
      .from("messages")
      .upsert({
        context: variables.message,
        conversation_id: variables.conversationId,
        user_id: variables.userId,
      })
      .select();

    return { data, error };
  };

  return useCombinedMutation({
    mutationKey,
    mutationFn,
  });
};
