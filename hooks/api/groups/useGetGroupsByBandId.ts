import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/utils";
import { Row } from "@/types";

export const useGetGroupsByBandId = (bandId?: string) => {
  const queryKey = ["groups"];

  const queryFn = async () => {
    return await supabase.from("groups").select("*").eq("band_id", bandId);
  };

  return useCombinedQuery<Row<"groups">[]>({
    queryKey,
    queryFn,
    enabled: !!bandId,
  });
};
