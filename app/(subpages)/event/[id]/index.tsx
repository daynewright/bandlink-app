import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import getReadableDateFrom from "@/utils/getReadableDateFrom";
import EventUserProfile from "@/components/Profile/UserChicklet";
import EventPills from "@/components/Event/EventPills";
import { primary } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import EventTextSection from "@/components/Event/EventTextSection";
import EventStaticMap from "@/components/Event/EventStaticMap";
import EventAttendeesSection from "@/components/Event/EventAttendeesSection";
import EventFileSection from "@/components/Event/EventFileSection";
import EventPhotoSection from "@/components/Event/EventPhotosSection";
import EventCommentSection from "@/components/Event/EventCommentSection";
import useGetUsers from "@/mockData/userGetUsers";

const eventData = {
  title: "Upper Class Band Reception",
  description: "Regular practice session for the marching band.",
  location: {
    name: "Football Field",
    latitude: 37.7749,
    longitude: -122.4194,
  },
  about:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  startTime: "2023-12-01T18:00:00.000Z",
  endTime: "2023-12-01T20:00:00.000Z",
  eventType: "Practice",
  organizerGroup: "Marching Band Association",
  userId: 123,
  imageUri: `https://picsum.photos/id/${
    Math.floor(Math.random() * 40) + 1
  }/600/800`,
  pills: ["Seniors", "Juniors"],
};

const EventDetailsPage = ({ event = eventData }) => {
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
  const readableTime = (timestamp: string) =>
    getReadableDateFrom(timestamp).readableTime;
  const readableDate = (timestamp: string) =>
    getReadableDateFrom(timestamp).readableDate;

  const users = useGetUsers(35);

  return (
    <ScrollView style={defaultStyles.container}>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <EventPills pills={pills} />
      <View style={styles.contentContainer}>
        <EventUserProfile
          username="John Jo"
          avatarUri={imageUri}
          headline="title"
        />
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.dateText}>{readableDate(startTime)}</Text>
          <Text style={styles.timeText}>
            Time: {readableTime(startTime)} to {readableTime(endTime)}
          </Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.details}>
            <Text>Location: {location.name}</Text>
            <Text>Type: {eventType}</Text>
            <Text>Organizer: {organizerGroup}</Text>
          </View>
        </View>
        <EventTextSection text={event.about} expandable />
        <EventAttendeesSection
          attendees={users.map((user) => ({
            name: `${user.name.first} ${user.name.last}`,
            avatar: user.picture.medium,
          }))}
        />
        <EventCommentSection commentCount={10} />
        <EventFileSection
          files={[
            {
              name: "Signup Form",
              link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            },
            {
              name: "Flag Flyer",
              link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            },
          ]}
        />
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
