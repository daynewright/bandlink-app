import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/utils";
import { Row } from "@/types";

export const useGetBands = () => {
  const queryKey = ["bands"];

  const queryFn = async () => {
    return await supabase.from("bands").select("*");
  };

  return useCombinedQuery<Row<"bands">[]>({ queryKey, queryFn });
};
