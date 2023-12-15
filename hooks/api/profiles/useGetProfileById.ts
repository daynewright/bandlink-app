import { supabase } from "@/clients/supabase";
import { useCombinedQuery } from "@/hooks/api/utils";
import { Row } from "@/types";

export type UserData = (Row<"users_profile"> & { image_url?: string }) | null;

type QueryFnReturn = Promise<{
  data: UserData;
  error: any;
}>;

export const useGetProfileById = (id: string) => {
  const queryKey = ["profiles", id];

  const queryFn = async (): QueryFnReturn => {
    const { data, error } = await supabase
      .from("users_profile")
      .select("*")
      .eq("id", id)
      .limit(1)
      .single();

    if (data?.profile_image_id) {
      const { data: profileImage } = await supabase
        .from("images")
        .select("*")
        .eq("id", data.profile_image_id)
        .limit(1)
        .single();

      if (profileImage) {
        const image = supabase.storage
          .from(`images/${data.profile_image_id}`)
          .getPublicUrl(profileImage.image_path, {
            transform: {
              height: 150,
              width: 150,
            },
          });

        return {
          data: { ...data, image_url: image.data.publicUrl },
          error,
        };
      }
    }

    return { data, error };
  };

  return useCombinedQuery<UserData>({ queryKey, queryFn });
};
