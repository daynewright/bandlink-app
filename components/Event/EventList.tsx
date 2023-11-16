import { UserInfo } from "@/types/user";
import { useRef, useState, useEffect } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import bandEvents from "@/mockData/events";

import EventCard from "@/components/Event/EventCard";
import { BandEvent } from "@/types/events";
import getRandomList from "@/mockData/getRandomList";

const EventList = () => {
  const eventListRef = useRef<FlatList>(null);
  const [events, setEvents] = useState<BandEvent[]>([]);

  useEffect(() => {
    if (!events.length) {
      setEvents(bandEvents.map((be) => ({ ...be, pills: getRandomList() })));
    }
  }, [events]);

  const RenderFeedItem: ListRenderItem<any> = ({ item }) => {
    return <EventCard event={item} />;
  };

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <FlatList ref={eventListRef} data={events} renderItem={RenderFeedItem} />
    </View>
  );
};

export default EventList;
