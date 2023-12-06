import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import getReadableDateFrom from "@/utils/getReadableDateFrom";
import UserChicklet from "@/components/Profile/UserChicklet";
import EventPills from "@/components/Event/EventPills";
import { primary } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import EventTextSection from "@/components/Event/EventTextSection";
import EventStaticMap from "@/components/Event/EventStaticMap";
import EventAttendeesSection from "@/components/Event/EventAttendeesSection";
import EventFileSection from "@/components/Event/EventFileSection";
import EventPhotoSection from "@/components/Event/EventPhotosSection";
import EventCommentSection from "@/components/Event/EventCommentSection";
import { useLocalSearchParams } from "expo-router";
import { useGetSingleEventWithDetails } from "@/hooks/api/events";
import { useGetGroupsByEventId } from "@/hooks/api/groups";

const EventDetailsPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: event, error, isFetching } = useGetSingleEventWithDetails(id);
  const { data: groups } = useGetGroupsByEventId(id);

  const readableTime = (timestamp: string) =>
    getReadableDateFrom(timestamp).readableTime;
  const readableDate = (timestamp: string) =>
    getReadableDateFrom(timestamp).readableDate;

  if (isFetching) {
    return <ActivityIndicator size="large" />;
  }

  if (!event || error) {
    return (
      <View>
        <Text>No event found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={defaultStyles.container}>
      {"imageUri" && (
        <Image
          source={{ uri: "imageUri" }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <EventPills pills={groups?.map((g) => g.group_name)} />
      <View style={styles.contentContainer}>
        <UserChicklet userId={event?.creator_user_id} />
        <View style={styles.card}>
          <Text style={styles.title}>{event?.event_name}</Text>
          <Text style={styles.dateText}>{readableDate(event?.event_date)}</Text>
          <Text style={styles.timeText}>
            Time: {readableTime(event?.start_time)} to{" "}
            {readableTime(event?.end_time)}
          </Text>
          <Text style={styles.description}>{event?.description}</Text>
          <View style={styles.details}>
            <Text>Location: {event?.location_name}</Text>
            <Text>Type: {event?.event_type}</Text>
          </View>
        </View>
        <EventTextSection
          text={event?.about ?? "No additional information at the moment."}
          expandable={event?.about?.length > 50}
        />
        <EventAttendeesSection attendees={event?.attendees} eventId={id} />
        <EventCommentSection commentCount={event?.messages_count} />
        <EventFileSection files={event?.files} />
        <EventPhotoSection
          photos={[
            {
              uri: `https://picsum.photos/id/${
                Math.floor(Math.random() * 40) + 1
              }/600/800`,
            },
            {
              uri: `https://picsum.photos/id/${
                Math.floor(Math.random() * 40) + 1
              }/600/800`,
            },
            {
              uri: `https://picsum.photos/id/${
                Math.floor(Math.random() * 40) + 1
              }/600/800`,
            },
            {
              uri: `https://picsum.photos/id/${
                Math.floor(Math.random() * 40) + 1
              }/600/800`,
            },
          ]}
        />
        {/* <EventStaticMap /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginHorizontal: 5,
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: primary.lightgrey,
    borderRadius: 8,
    overflow: "hidden",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    paddingHorizontal: 10,
  },
  description: {
    color: primary.darkgrey,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  details: {
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: primary.orange,
    paddingHorizontal: 10,
  },
  timeText: {
    color: primary.darkgrey,
    fontSize: 10,
    paddingHorizontal: 10,
  },
});

export default EventDetailsPage;
