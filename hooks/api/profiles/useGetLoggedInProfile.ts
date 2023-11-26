import { Row } from "@/types";
import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/utils";
import useAuthStore from "@/store/useAuthStore";

export const useGetLoggedInProfile = () => {
  const authUserId = useAuthStore((state) => state.authUser?.id);

  const queryKey = ["profiles", "auth", authUserId];

  const queryFn = async () => {
    const { data, error } = await supabase
      .from("users_profile")
      .select("*")
      .eq("auth_user_id", authUserId)
      .limit(1)
      .single();

    return { data, error };
  };

  return useCombinedQuery<Row<"users_profile">>({
    queryKey,
    queryFn,
    enabled: !!authUserId,
  });
};
