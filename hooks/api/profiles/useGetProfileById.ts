import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/useCombinedQuery";

export const useGetProfileById = (id: string) => {
  const queryKey = ["profiles", id];

  const queryFn = async () => {
    return await supabase
      .from("users_profile")
      .select("*")
      .eq("id", id)
      .single();
  };

  return useCombinedQuery({ queryKey, queryFn });
};
