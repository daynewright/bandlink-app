import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/utils";

export const useGetSingleEventWithDetails = (eventId?: string) => {
  const queryKey = ["events", "single", eventId];

  const queryFn = async () => {
    return supabase.rpc("get_single_event_with_details", {
      p_event_id: eventId,
    });
  };

  return useCombinedQuery({ queryKey, queryFn });
};
