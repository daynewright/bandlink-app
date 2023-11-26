import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/utils";
import { useGetLoggedInProfile } from "@/hooks/api/profiles";

export const useGetBandForUser = () => {
  const { data: user } = useGetLoggedInProfile();

  const queryKey = ["bands", "user", user?.id];

  const queryFn = async () => {
    return await supabase
      .from("users_bands")
      .select("created_at, band:bands(*)")
      .eq("user_id", user?.id)
      .limit(1)
      .single();
  };

  return useCombinedQuery({ queryKey, queryFn });
};
