import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/utils";
import { Row } from "@/types";

export const useGetProfileById = (id: string) => {
  const queryKey = ["profiles", id];

  const queryFn = async () => {
    return await supabase
      .from("users_profile")
      .select("*")
      .eq("id", id)
      .limit(1)
      .single();
  };

  return useCombinedQuery<Row<"users_profile">>({ queryKey, queryFn });
};
