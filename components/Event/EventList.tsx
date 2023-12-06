import { useRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  View,
} from "react-native";

import EventCard from "@/components/Event/EventCard";
import { useGetEventsByUserBand } from "@/hooks/api/events";

const EventList = () => {
  const eventListRef = useRef<FlatList>(null);
  const { data, isFetching } = useGetEventsByUserBand();

  const RenderFeedItem: ListRenderItem<any> = ({ item: event }) => {
    return <EventCard event={event} />;
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
