import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/utils";
import { Row } from "@/types";

type ProfileData = Row<"users_profile"> & { status: string }[];

type QueryFnReturn = Promise<{
  data: ProfileData;
  error: any;
}>;

export const useGetAttendeesByEventId = (eventId?: string) => {
  const queryKey = ["events", "attendees"];

  const queryFn = async (): QueryFnReturn => {
    const { data, error } = await supabase
      .from("event_attendance")
      .select(
        `
        status,
        users_profile (
          *
        )
      `
      )
      .eq("event_id", eventId);

    const transformedData = data?.map((item) => ({
      ...item.users_profile,
      status: item.status,
    }));

    return {
      data: transformedData as unknown as ProfileData,
      error,
    };
  };

  return useCombinedQuery<ProfileData>({
    queryKey,
    queryFn,
    enabled: !!eventId,
  });
};
