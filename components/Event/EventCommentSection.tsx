import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { primary } from "@/constants/Colors";
import { Link } from "expo-router";

type Props = {
  commentCount?: number;
  eventId: string;
};

const EventAttendeesSection = ({ commentCount, eventId }: Props) => {
  return (
    <Link href={`/(subpages)/event/${eventId}/comments`} asChild>
      <Pressable>
        <View style={styles.container}>
          <Text style={styles.title}>Comments ({commentCount ?? 0})</Text>
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Ionicons name="chatbubbles-outline" size={20} />
              <Text style={styles.text}> Join the conversation!</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="black" />
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: primary.darkgrey,
  },
});

export default EventAttendeesSection;
