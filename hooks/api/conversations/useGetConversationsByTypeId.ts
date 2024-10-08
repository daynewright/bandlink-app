import { supabase } from "@/clients/supabase";
import { Row, Database } from "@/types";
import { useCombinedQuery } from "@/hooks/api/utils";
import { useGetLoggedInProfile } from "../profiles";

type TypeEnum = Database["public"]["Enums"]["conversation_type"];
type ConversationsData = Row<"conversations"> | null;

export const useGetConversationByTypeId = (type: TypeEnum, id?: string) => {
  const { data: me } = useGetLoggedInProfile();

  const queryKey = ["conversations", type, id];

  const queryFn = async () => {
    if (type === "USER") {
      return await supabase
        .from("conversations")
        .select("*")
        .eq("conversation_type", type)
        .or(`user_id_a.eq.${me?.id},user_id_a.eq.${id}`)
        .or(`user_id_b.eq.${me?.id},user_id_b.eq.${id}`)
        .limit(1)
        .single();
    }

    return await supabase
      .from("conversations")
      .select("*")
      .eq("conversation_type", type)
      .eq(`${type.toLocaleLowerCase()}_id`, id)
      .limit(1)
      .single();
  };

  return useCombinedQuery<ConversationsData>({
    queryKey,
    queryFn,
    enabled: !!id,
  });
};
