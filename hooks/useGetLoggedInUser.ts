import { useEffect } from "react";
import { supabase } from "@/clients/supabase";
import useAuthStore from "@/store/useAuthStore";
import { useGetLoggedInProfile } from "./api";

export const useGetLoggedInUser = () => {
  const { authUser, isLoading, addUser, removeUser } = useAuthStore();

  useGetLoggedInProfile();

  const fetchUser = async () => {
    try {
      const session = await supabase.auth.getSession();
      if (session) {
        const { data, error } = await supabase.auth.getUser();
        if (data && !error) {
          addUser(data.user);
        }
      }
    } finally {
      useAuthStore.setState({ isLoading: false });
    }
  };

  useEffect(() => {
    fetchUser();

    const authListener = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        removeUser();
      }
      if (event === "SIGNED_IN") {
        fetchUser();
      }
    });

    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, []);

  return { authUser, isLoading };
};
