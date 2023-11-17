import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import getRandomColor from "@/utils/getRandomColor";
import { primary } from "@/constants/Colors";

type Props = {
  sender: string;
  message: string;
  time: string;
  avatar?: string;
};

const ChatDirectPreviewCard = ({ sender, message, time, avatar }: Props) => {
  const getInitials = (name: string) => {
    const initials = name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
    return initials;
  };

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
          <Text style={styles.initials}>{getInitials(sender)}</Text>
        </View>
      )}
      <View style={styles.messageContainer}>
        <Text style={styles.sender}>{sender}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      <Text style={styles.time}>{time}</Text>
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
  time: {
    color: primary.darkgrey,
  },
});

export default ChatDirectPreviewCard;
