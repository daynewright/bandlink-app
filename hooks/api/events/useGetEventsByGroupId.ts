import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/useCombinedQuery";
import { Row } from "@/types";

type EventsData = Row<"events">[] | null;

export const useGetEventsByGroupId = (groupId?: string) => {
  const queryKey = ["events", groupId];

  const queryFn = async (): Promise<{
    data: EventsData;
    error: any;
  }> => {
    const { data, error } = await supabase
      .from("events_groups")
      .select(`events (*)`)
      .eq("group_id", groupId);

    const transformedData =
      (data?.map((e) => e.events) as unknown as EventsData) ?? null;

    return { data: transformedData, error };
  };

  return useCombinedQuery<EventsData>({
    queryKey,
    queryFn,
    enabled: !!groupId,
  });
};
