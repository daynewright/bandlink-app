import { useRef, useState, useEffect } from "react";
import { FlatList, ListRenderItem, Pressable, View } from "react-native";
import bandEvents from "@/mockData/events";

import ChatDirectPreviewCard from "@/components/Chat/ChatDirectPreviewCard";
import { BandEvent } from "@/types/events";
import { Link } from "expo-router";

const ChatDirectList = () => {
  const eventListRef = useRef<FlatList>(null);
  const [events, setEvents] = useState<BandEvent[]>([]);

  useEffect(() => {
    if (!events.length) {
      setEvents(bandEvents);
    }
  }, [events]);

  const RenderFeedItem: ListRenderItem<any> = ({ item }) => {
    return (
      <Link href="/(subpages)/chat/direct/32" asChild>
        <Pressable>
          <ChatDirectPreviewCard
            sender="Johnny Joe"
            message="Yo how is it going?"
            avatar={`https://picsum.photos/${
              Math.floor(Math.random() * 40) + 1
            }/200`}
            time="8:13pm"
          />
        </Pressable>
      </Link>
    );
  };

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <FlatList ref={eventListRef} data={events} renderItem={RenderFeedItem} />
    </View>
  );
};

export default ChatDirectList;
