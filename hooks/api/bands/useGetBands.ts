import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/useCombinedQuery";
import { Row } from "@/types/supabase";

export const useGetBands = () => {
  const queryKey = ["bands"];

  const queryFn = async () => {
    return await supabase.from("bands").select("*").returns<Row<"bands">>();
  };

  return useCombinedQuery({ queryKey, queryFn });
};
