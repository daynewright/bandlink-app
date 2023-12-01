import { useRef, useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  View,
} from "react-native";
import bandEvents from "@/mockData/events";

import EventCard from "@/components/Event/EventCard";
import getRandomList from "@/mockData/getRandomList";
import { useGetEventsByUserBand } from "@/hooks/api/events";

const EventList = () => {
  const eventListRef = useRef<FlatList>(null);
  const [events, setEvents] = useState<any>([]);
  const { data, isFetching } = useGetEventsByUserBand();

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
      {isFetching ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList ref={eventListRef} data={data} renderItem={RenderFeedItem} />
      )}
    </View>
  );
};

export default EventList;
