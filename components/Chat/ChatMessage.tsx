import { primary } from "@/constants/Colors";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type ChatMessageProps = {
  message: string;
  isCurrentUser: boolean;
  user: {
    name: string;
    avatar: string;
  };
  timestamp: string;
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isCurrentUser,
  user,
  timestamp,
}) => {
  const containerStyle = isCurrentUser ? styles.currentUser : styles.otherUser;
  const contentStyle = isCurrentUser
    ? { backgroundColor: primary.orange }
    : { backgroundColor: primary.darkgrey };
  const avatarStyle = isCurrentUser
    ? styles.currentUserAvatar
    : styles.otherUserAvatar;

  return (
    <View>
      <Text style={styles.timestamp}>{timestamp}</Text>
      <View style={[styles.container, containerStyle]}>
        {!isCurrentUser && (
          <Image
            source={{ uri: user.avatar }}
            style={[styles.avatar, avatarStyle]}
          />
        )}
        <View style={[styles.messageContent, contentStyle]}>
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.messageText}>{message}</Text>
        </View>
        {isCurrentUser && (
          <Image
            source={{ uri: user.avatar }}
            style={[styles.avatar, avatarStyle]}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  currentUser: {
    justifyContent: "flex-end",
  },
  otherUser: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 8,
  },
  currentUserAvatar: {
    marginHorizontal: 0,
  },
  otherUserAvatar: {
    marginHorizontal: 0,
  },
  messageContent: {
    flexDirection: "column",
    maxWidth: "70%",
    marginHorizontal: 10,
    borderRadius: 8,
    padding: 10,
  },
  username: {
    color: primary.white,
    marginBottom: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  messageText: {
    color: "white",
  },
  timestamp: {
    marginTop: 5,
    fontSize: 8,
    color: primary.darkgrey,
    alignSelf: "center",
  },
});

export default ChatMessage;
