import { useRef, useState, useEffect } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import bandEvents from "@/mockData/events";

import ChatCard from "@/components/ChatCard";
import { BandEvent } from "@/types/events";

const ChatList = () => {
  const eventListRef = useRef<FlatList>(null);
  const [events, setEvents] = useState<BandEvent[]>([]);

  useEffect(() => {
    if (!events.length) {
      setEvents(bandEvents);
    }
  }, [events]);

  const RenderFeedItem: ListRenderItem<any> = ({ item }) => {
    return <ChatCard />;
  };

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <FlatList ref={eventListRef} data={events} renderItem={RenderFeedItem} />
    </View>
  );
};

export default ChatList;
