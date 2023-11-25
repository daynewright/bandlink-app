import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/useCombinedQuery";
import { Database } from "@/types/supabase";

export const useGetBands = () => {
  const queryKey = ["bands"];

  const queryFn = async () => {
    return await supabase
      .from("bands")
      .select("*")
      .returns<Database["public"]["Tables"]["bands"]["Row"]>();
  };

  return useCombinedQuery({ queryKey, queryFn });
};
