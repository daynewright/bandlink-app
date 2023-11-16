import Colors, { primary } from "@/constants/Colors";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatCard = ({ sender, message, timestamp }: any) => {
  return (
    <View style={styles.card}>
      <Text style={styles.sender}>{sender}</Text>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.timestamp}>{timestamp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    margin: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: primary.darkgrey,
  },
  sender: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  message: {
    fontSize: 16,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
  },
});

export default ChatCard;
