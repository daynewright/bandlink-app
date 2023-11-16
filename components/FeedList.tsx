import { useEffect, useRef, useState } from "react";
import { FlatList, ListRenderItem } from "react-native";

import { View } from "./Themed";
import FeedCard from "./FeedCard";
import { UserInfo } from "@/types/user";

const FeedList = () => {
  const feedListRef = useRef<FlatList>(null);
  const [users, setUsers] = useState<UserInfo[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const result = await fetch("https://randomuser.me/api/?results=15");
      const users = await result.json();

      setUsers(
        users.results.map((u: UserInfo) => ({ user: u, post: "POST STUFF" }))
      );
    };

    if (!users.length) {
      getUsers();
    }
  }, [users]);

  const RenderFeedItem: ListRenderItem<any> = ({ item }) => {
    return <FeedCard {...item} />;
  };

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <FlatList ref={feedListRef} data={users} renderItem={RenderFeedItem} />
    </View>
  );
};

export default FeedList;
