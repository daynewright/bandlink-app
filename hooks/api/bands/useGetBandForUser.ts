import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/utils";
import { useGetLoggedInProfile } from "@/hooks/api/profiles";
import { Row } from "@/types";

type BandData = Row<"bands"> | null;

type QueryFnReturn = Promise<{
  data: BandData;
  error: any;
}>;

export const useGetBandForUser = () => {
  const { data: user } = useGetLoggedInProfile();

  const queryKey = ["bands", "user", user?.id];

  const queryFn = async (): QueryFnReturn => {
    const { data, error } = await supabase
      .from("users_bands")
      .select("band:bands(*)")
      .eq("user_id", user?.id)
      .limit(1)
      .single();

    return {
      data: data?.band as unknown as BandData,
      error,
    };
  };

  return useCombinedQuery<BandData>({ queryKey, queryFn });
};
