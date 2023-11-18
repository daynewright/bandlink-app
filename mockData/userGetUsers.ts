import { UserInfo } from "@/types/user";
import { useEffect, useState } from "react";

const useGetUsers = (count: number) => {
  const [users, setUsers] = useState<UserInfo[]>();

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await fetch(
          `https://randomuser.me/api/?results=${count}`
        );
        const user = await result.json();
        setUsers(user.results);
      } catch (e) {
        console.log(e);
      }
    };

    if (!users) {
      getUser();
    }
  }, [users]);

  return users ?? [];
};

export default useGetUsers;
