import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/utils";
import { FunctionsRPC, Row } from "@/types";

export const useGetSingleEventWithDetails = (eventId?: string) => {
  console.log("INSIDE FETCH", eventId);

  const queryKey = ["events", "single", eventId];

  const queryFn = async () => {
    const { data, error } = await supabase.rpc(
      "get_single_event_with_details",
      {
        p_event_id: eventId,
      }
    );

    return { data: data[0], error };
  };

  return useCombinedQuery<
    FunctionsRPC<"get_single_event_with_details">[number]
  >({
    queryKey,
    queryFn,
    enabled: !!eventId,
  });
};
