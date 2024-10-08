import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/utils";
import { Row } from "@/types";

export const useGetGroupById = (groupId?: string) => {
  const queryKey = ["groups", groupId];

  const queryFn = async () => {
    return await supabase
      .from("groups")
      .select("*")
      .eq("id", groupId)
      .limit(1)
      .single();
  };

  return useCombinedQuery<Row<"groups">>({
    queryKey,
    queryFn,
    enabled: !!groupId,
  });
};
