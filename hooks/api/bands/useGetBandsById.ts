import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/useCombinedQuery";
import { Row } from "@/types/supabase";

export const useGetBandById = (bandId: string) => {
  const queryKey = ["bands", bandId];

  const queryFn = async () => {
    return await supabase
      .from("bands")
      .select("*")
      .eq("id", bandId)
      .returns<Row<"bands">>();
  };

  return useCombinedQuery({ queryKey, queryFn });
};
