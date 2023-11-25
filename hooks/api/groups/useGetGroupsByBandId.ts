import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/useCombinedQuery";
import { Row } from "@/types/supabase";

export const useGetGroupsByBandId = (bandId: string) => {
  const queryKey = ["groups"];

  const queryFn = async () => {
    return await supabase
      .from("groups")
      .select("*")
      .eq("band_id", bandId)
      .returns<Row<"groups">>();
  };

  return useCombinedQuery({ queryKey, queryFn });
};
