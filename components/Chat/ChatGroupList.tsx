import { useRef, useState, useEffect } from "react";
import { FlatList, ListRenderItem, Pressable, View } from "react-native";
import bandEvents from "@/mockData/events";

import { BandEvent } from "@/types/events";
import ChatGroupPreviewCard from "@/components/Chat/ChatGroupPreviewCard";
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
      <Link href="/(subpages)/chat/group/34" asChild>
        <Pressable>
          <ChatGroupPreviewCard
            group="Winterguard"
            time="1 day ago"
            avatar={`https://picsum.photos/${
              Math.floor(Math.random() * 40) + 1
            }/200`}
            memberCount="28"
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
