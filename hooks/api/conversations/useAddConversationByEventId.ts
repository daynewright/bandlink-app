import { supabase } from "@/clients/supabase";
import { useCombinedMutation } from "@/hooks/api/utils";

export const useAddConversationByEventId = () => {
  const mutationKey = ["conversations", "event"];

  const mutationFn = async (variables: { eventId?: string }) => {
    const { data, error } = await supabase
      .from("conversations")
      .upsert({
        event_id: variables.eventId,
        conversation_type: "EVENT",
      })
      .select()
      .limit(1)
      .single();

    return { data, error };
  };

  return useCombinedMutation({
    mutationKey,
    mutationFn,
  });
};
