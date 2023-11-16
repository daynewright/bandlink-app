import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type Props = {
  username: string;
  avatarUri: string;
  headline: string;
};

const UserChicklet = ({ username, avatarUri, headline }: Props) => {
  return (
    <View style={styles.userInfoContainer}>
      <Image source={{ uri: avatarUri }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{username}</Text>
        <Text style={styles.headline}>Title</Text>
        <Text style={styles.timestamp}>Section - Role</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    width: "100%",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  headline: {
    fontSize: 12,
    color: "#666",
  },
  timestamp: {
    fontSize: 10,
    color: "#888",
  },
  postText: {
    fontSize: 16,
    marginBottom: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 6,
    color: "#555",
  },
});

export default UserChicklet;
