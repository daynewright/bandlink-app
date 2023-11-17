import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import getRandomColor from "@/utils/getRandomColor";
import { primary } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  group: string;
  memberCount: string;
  time: string;
  avatar?: string;
};

const ChatGroupPreviewCard = ({ group, time, memberCount, avatar }: Props) => {
  const getInitials = (name: string) => {
    const initials = name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
    return initials;
  };

  const unreadCount = "5";

  return (
    <View style={styles.container}>
      {avatar ? (
        <Image source={{ uri: avatar }} style={styles.avatar} />
      ) : (
        <View
          style={[
            styles.initialsContainer,
            { backgroundColor: getRandomColor() },
          ]}
        >
          <Text style={styles.initials}>{getInitials(group)}</Text>
        </View>
      )}
      {unreadCount && (
        <View style={styles.unreadCountContainer}>
          <Text style={styles.unreadCount}>{unreadCount}</Text>
        </View>
      )}
      <View style={styles.messageContainer}>
        <Text style={styles.sender}>{group}</Text>
        <Text style={styles.message}>{time}</Text>
      </View>
      <Text style={styles.count}>{memberCount}</Text>
      <Ionicons name="person-add-outline" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  initialsContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  unreadCountContainer: {
    position: "absolute",
    top: 40,
    left: 40,
    backgroundColor: primary.orange,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadCount: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  messageContainer: {
    flex: 1,
  },
  sender: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: primary.darkgrey,
  },
  count: {
    color: primary.darkgrey,
    marginRight: 5,
  },
});

export default ChatGroupPreviewCard;
