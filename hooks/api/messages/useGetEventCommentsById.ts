import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/utils";
import { FunctionsRPC } from "@/types";

export const useGetEventCommentsById = (
  eventId?: string,
  pageNumber = 1,
  itemsPerPage = 20
) => {
  const queryKey = ["messages", "events", eventId];

  const queryFn = async () => {
    const { data, error } = await supabase.rpc("get_messages_for_event", {
      p_event_id: eventId,
      p_page_number: pageNumber,
      p_items_per_page: itemsPerPage,
    });

    return { data, error };
  };

  return useCombinedQuery<FunctionsRPC<"get_messages_for_event">>({
    queryKey,
    queryFn,
    enabled: !!eventId,
  });
};
