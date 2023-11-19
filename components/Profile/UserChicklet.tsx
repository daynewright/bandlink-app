import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  username: string;
  avatarUri: string;
  headline: string;
};

const UserChicklet = ({ username, avatarUri, headline }: Props) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push("/(modals)/profile")}>
      <View style={styles.userInfoContainer}>
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.headline}>{headline}</Text>
          <Text style={styles.section}>Section - Role</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
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
  section: {
    fontSize: 10,
    color: "#888",
  },
});

export default UserChicklet;
