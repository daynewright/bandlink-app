import React from "react";
import { View, Text, StyleSheet } from "react-native";
import UserAvatar from "@/components/Profile/UserAvatar";
import { primary } from "@/constants/Colors";
import { UserData, useGetProfileById } from "@/hooks/api/profiles";
import useAuthStore from "@/store/useAuthStore";

type ChatMessageProps = {
  message: string;
  userId: string;
  user?: UserData;
  timestamp: string;
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  userId,
  timestamp,
}) => {
  const { data: user } = useGetProfileById(userId);
  const { authUser } = useAuthStore();

  const isCurrentUser = user?.auth_user_id === authUser?.id;

  const containerStyle = isCurrentUser ? styles.currentUser : styles.otherUser;
  const backgroundColor = isCurrentUser ? primary.orange : primary.darkgrey;

  return (
    <View>
      <Text style={styles.timestamp}>{timestamp}</Text>
      <View style={[styles.container, containerStyle]}>
        {!isCurrentUser && (
          <UserAvatar user={user} backgroundColor={backgroundColor} />
        )}
        <View style={[styles.messageContent, { backgroundColor }]}>
          <Text style={styles.username}>
            {user?.first_name
              ? `${user?.first_name} ${user?.last_name}`
              : "Unknown"}
          </Text>
          <Text style={styles.messageText}>{message}</Text>
        </View>
        {isCurrentUser && (
          <UserAvatar user={user} backgroundColor={backgroundColor} />
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
  messageContent: {
    flexDirection: "column",
    maxWidth: "80%",
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
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
