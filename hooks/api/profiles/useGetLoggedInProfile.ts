import { supabase } from "@/clients/supabase";
import { AuthError, PostgrestError, User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { useCombinedQuery } from "../useCombinedQuery";
import { Row } from "@/types/supabase";

export const useGetLoggedInProfile = () => {
  const [localUser, setLocalUser] = useState<{
    data: User | undefined;
    error: PostgrestError | AuthError | undefined;
  }>();

  useEffect(() => {
    const getUserAsync = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (data?.user) {
          setLocalUser({ data: data.user, error: undefined });
        } else if (error) {
          setLocalUser({ data: undefined, error });
        }
      } catch (error: any) {
        setLocalUser({ data: undefined, error });
      }
    };

    getUserAsync();
  }, []);

  const queryKey = ["profiles", localUser?.data?.id];

  const queryFn = async () => {
    if (localUser?.error) {
      return { data: null, error: localUser.error };
    }

    const { data, error } = await supabase
      .from("users_profile")
      .select("*")
      .eq("auth_user_id", localUser?.data?.id)
      .limit(1)
      .returns<Row<"users_profile">>();

    return { data, error };
  };

  return useCombinedQuery({ queryKey, queryFn, enabled: !!localUser });
};
