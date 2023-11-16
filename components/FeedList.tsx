import { useRef } from "react";
import { FlatList, ListRenderItem } from "react-native";

import { defaultStyles } from "@/constants/Styles";
import { View, Text } from "./Themed";
import FeedCard from "./FeedCard";

const data = [
  {
    sender: "some one",
    message: "someting",
  },
  {
    sender: "some one",
    message: "someting",
  },
  {
    sender: "some one",
    message: "someting",
  },
  {
    sender: "some one",
    message: "someting",
  },
  {
    sender: "some one",
    message: "someting",
  },
  {
    sender: "some one",
    message: "someting",
  },
  {
    sender: "some one",
    message: "someting",
  },
  {
    sender: "some one",
    message: "someting",
  },
  {
    sender: "some one",
    message: "someting",
  },
  {
    sender: "some one",
    message: "someting",
  },
];

const FeedList = () => {
  const feedListRef = useRef<FlatList>(null);

  const RenderFeedItem: ListRenderItem<any> = ({ item }) => {
    console.log({ item });
    return <FeedCard {...item} />;
  };

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <FlatList ref={feedListRef} data={data} renderItem={RenderFeedItem} />
    </View>
  );
};

export default FeedList;
