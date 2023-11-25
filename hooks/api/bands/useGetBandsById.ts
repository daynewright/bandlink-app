import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/useCombinedQuery";
import { Row } from "@/types";

export const useGetBandById = (bandId: string) => {
  const queryKey = ["bands", bandId];

  const queryFn = async () => {
    return await supabase.from("bands").select("*").eq("id", bandId).single();
  };

  return useCombinedQuery<Row<"bands">>({ queryKey, queryFn });
};
