import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { primary } from "@/constants/Colors";

const ChatUnreadNotification = () => {
  return (
    <View style={styles.unreadLineContainer}>
      <View style={styles.unreadLine} />
      <Text style={styles.unreadText}>unread</Text>
      <View style={styles.unreadLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  unreadLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  unreadLine: {
    height: 1,
    backgroundColor: primary.orange,
    flex: 1,
    marginHorizontal: 5,
  },
  unreadText: {
    color: primary.orange,
    fontSize: 12,
  },
});

export default ChatUnreadNotification;
