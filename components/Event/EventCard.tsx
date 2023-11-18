import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { primary } from "@/constants/Colors";
import getReadableDateFrom from "@/utils/getReadableDateFrom";

import EventUserProfile from "@/components/Profile/UserChicklet";
import EventPills from "@/components/Event/EventPills";
import EventActionRow from "@/components/Event/EventActionRow";

import { BandEvent } from "@/types/events";
import { UserInfo } from "@/types/user";
import { Link } from "expo-router";

const EventCard = ({ event }: { event: BandEvent }) => {
  const {
    title,
    description,
    location,
    startTime,
    endTime,
    eventType,
    organizerGroup,
    userId,
    imageUri,
    pills,
  } = event;

  const [user, setUser] = useState<UserInfo>();

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await fetch("https://randomuser.me/api/");
        const user = await result.json();
        setUser(user.results[0]);
      } catch (e) {
        console.log(e);
      }
    };

    if (!user) {
      getUser();
    }
  }, [user]);

  const readableTime = (timeString: string) =>
    getReadableDateFrom(timeString).readableTime;

  const readableDate = (timeString: string) =>
    getReadableDateFrom(timeString).readableDate;

  return (
    <Link href="/(subpages)/event/123" asChild>
      <Pressable>
        <View style={styles.card}>
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          <EventPills pills={pills} />
          <View style={styles.textSection}>
            {user && (
              <EventUserProfile
                username={`${user.name.first} ${user.name.last}`}
                avatarUri={user.picture.medium}
                headline="title"
              />
            )}
            <Text style={styles.dateText}>{readableDate(startTime)}</Text>
            <Text style={styles.timeText}>
              Time: {readableTime(startTime)} to {readableTime(endTime)}
            </Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.details}>
              <Text>Location: {location.name}</Text>
              <Text>Type: {eventType}</Text>
              <Text>Organizer: {organizerGroup}</Text>
            </View>
          </View>
          <EventActionRow />
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
