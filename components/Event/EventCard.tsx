import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { primary } from "@/constants/Colors";
import getReadableDateFrom from "@/utils/getReadableDateFrom";

import UserChicklet from "@/components/Profile/UserChicklet";
import EventPills from "@/components/Event/EventPills";
import EventActionRow from "@/components/Event/EventActionRow";

import { Link } from "expo-router";
import { FunctionsRPC } from "@/types";

type Event = FunctionsRPC<"get_events_for_user_in_band">[0];

const EventCard = ({ event }: { event: Event }) => {
  const {
    event_name,
    event_id,
    description,
    event_date,
    location_name,
    start_time,
    end_time,
    event_type,
    // creator_name,
    // creator_user_id,
    creator_picture,
    group_names: pills,
    attendees_count,
    messages_count,
  } = event;

  const readableTime = (timeString: string) =>
    getReadableDateFrom(timeString).readableTime;

  const readableDate = (timeString: string) =>
    getReadableDateFrom(timeString).readableDate;

  return (
    <Link href={`/(subpages)/event/${event_id}`} asChild>
      <Pressable>
        <View style={styles.card}>
          <Image
            source={{ uri: creator_picture }}
            style={styles.image}
            resizeMode="cover"
          />
          {pills.length && <EventPills pills={pills} />}
          <View style={styles.textSection}>
            <UserChicklet userId={event.creator_user_id} />
            <Text style={styles.dateText}>{readableDate(event_date)}</Text>
            <Text style={styles.timeText}>
              Time: {readableTime(start_time)} to {readableTime(end_time)}
            </Text>
            <Text style={styles.title}>{event_name}</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.details}>
              <Text>Location: {location_name}</Text>
              <Text>Type: {event_type}</Text>
            </View>
          </View>
          <EventActionRow
            attendanceCount={attendees_count}
            commentCount={messages_count}
            eventId={event_id}
          />
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: primary.lightgrey,
    borderRadius: 8,
    overflow: "hidden",
    margin: 16,
    position: "relative",
  },
  image: {
    height: 200,
    width: "100%",
    backgroundColor: primary.lightgrey,
  },
  textSection: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
  },
  description: {
    color: primary.darkgrey,
    marginBottom: 8,
  },
  details: {
    marginVertical: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: primary.orange,
  },
  timeText: {
    color: primary.darkgrey,
    fontSize: 10,
  },
});

export default EventCard;
