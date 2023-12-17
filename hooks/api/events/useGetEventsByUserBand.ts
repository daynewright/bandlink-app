import { supabase } from "@/clients/supabase";
import { FunctionsRPC } from "@/types";
import { useCombinedQuery } from "@/hooks/api/utils";
import { useGetBandForUser } from "@/hooks/api/bands";
import { useGetLoggedInProfile } from "@/hooks/api/profiles";

export const useGetEventsByUserBand = () => {
  const { data: band } = useGetBandForUser();
  const { data: me } = useGetLoggedInProfile();

  const queryKey = ["events", band?.id];

  const queryFn = async () => {
    const { data, error } = await supabase.rpc("get_events_for_user_in_band", {
      p_band_id: band?.id,
      p_user_id: me?.id,
      p_items_per_page: 10,
      p_page_number: 1,
      p_sort_order: "asc",
    });

    return { data, error };
  };

  return useCombinedQuery<FunctionsRPC<"get_events_for_user_in_band">>({
    queryKey,
    queryFn,
    enabled: !!band?.id,
  });
};
