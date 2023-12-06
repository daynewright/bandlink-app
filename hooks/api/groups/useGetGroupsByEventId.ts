import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/utils";
import { Row } from "@/types";

type GroupData = Row<"groups">[] | null;

type QueryFnReturn = Promise<{
  data: GroupData;
  error: any;
}>;

export const useGetGroupsByEventId = (eventId?: string) => {
  const queryKey = ["groups", "event", eventId];

  const queryFn = async (): QueryFnReturn => {
    const { data, error } = await supabase
      .from("events_groups")
      .select(
        `
          groups (
            id,
            group_name
          )
        `
      )
      .eq("event_id", eventId);

    const groups = data?.map((g) => g.groups);

    return {
      data: groups as unknown as GroupData,
      error,
    };
  };

  return useCombinedQuery<GroupData>({
    queryKey,
    queryFn,
    enabled: !!eventId,
  });
};
