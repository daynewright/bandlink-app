import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { primary } from "@/constants/Colors";
import { Link } from "expo-router";

type Props = {
  attendees: {
    name: string;
  }[];
};

const EventAttendeesSection = ({ attendees }: Props) => {
  const maxDisplay = 5;
  const additionalCount = Math.max(0, attendees.length - maxDisplay);

  return (
    <Link href="/(subpages)/event/45/attendees" asChild>
      <Pressable>
        <View style={styles.container}>
          <Text style={styles.title}>Attending ({attendees.length})</Text>
          <View style={styles.contentContainer}>
            <View style={styles.avatarContainer}>
              {attendees.slice(0, maxDisplay).map((attendee, index) => (
                <View key={index} style={styles.avatarWrapper}>
                  <Text style={styles.avatarText}>
                    {attendee.name.charAt(0)}
                  </Text>
                </View>
              ))}
              {additionalCount > 0 && (
                <View style={styles.overlayWrapper}>
                  <Text style={styles.overlayText}>+{additionalCount}</Text>
                </View>
              )}
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
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatarWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: primary.white,
    borderWidth: 1,
    backgroundColor: primary.orange,
    justifyContent: "center",
    alignItems: "center",
    marginRight: -10,
    zIndex: 1,
  },
  avatarText: {
    color: primary.white,
    fontWeight: "bold",
  },
  overlayWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -10,
    zIndex: 1,
  },
  overlayText: {
    color: primary.white,
    fontWeight: "bold",
  },
});

export default EventAttendeesSection;
