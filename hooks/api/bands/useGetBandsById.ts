import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/useCombinedQuery";

export const useGetBandById = (bandId: string) => {
  const queryKey = ["bands", bandId];

  const queryFn = async () => {
    return await supabase.from("bands").select("*").eq("id", bandId);
  };

  return useCombinedQuery({ queryKey, queryFn });
};
