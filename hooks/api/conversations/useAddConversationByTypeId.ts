import { supabase } from "@/clients/supabase";
import { useCombinedMutation } from "@/hooks/api/utils";
import { Database } from "@/types";

type TypeEnum = Database["public"]["Enums"]["conversation_type"];

export const useAddConversationByTypeId = (type: TypeEnum) => {
  const mutationKey = ["conversations", type];

  const mutationFn = async (variables: {
    id?: string;
    userA?: string;
    userB?: string;
  }) => {
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
    }

    if (type === "GROUP") {
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
    } else {
      // TYPE is "USER"
      const { data, error } = await supabase
        .from("conversations")
        .upsert({
          user_id_a: variables.userA,
          user_id_b: variables.userB,
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
