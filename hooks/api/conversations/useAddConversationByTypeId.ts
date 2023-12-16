import { supabase } from "@/clients/supabase";
import { useCombinedMutation } from "@/hooks/api/utils";

export const useAddConversationByTypeId = (type: "EVENT" | "GROUP") => {
  const mutationKey = ["conversations", type];

  const mutationFn = async (variables: { id?: string }) => {
    if (type === "EVENT") {
      const { data, error } = await supabase
        .from("conversations")
        .upsert({
          event_id: variables.id,
          conversation_type: type,
        })
        .select()
        .limit(1)
        .single();

      return { data, error };
    } else {
      const { data, error } = await supabase
        .from("conversations")
        .upsert({
          group_id: variables.id,
          conversation_type: type,
        })
        .select()
        .limit(1)
        .single();

      return { data, error };
    }
  };

  return useCombinedMutation({
    mutationKey,
    mutationFn,
  });
};
