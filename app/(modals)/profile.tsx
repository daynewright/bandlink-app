import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import useGetUsers from "@/mockData/userGetUsers";
import { defaultStyles } from "@/constants/Styles";
import { primary } from "@/constants/Colors";

const UserProfile = () => {
  const router = useRouter();
  const userData = useGetUsers(1);
  const user = {
    ...userData[0],
    groups: [
      { name: "trumbone" },
      { name: "senior" },
      { name: "momz" },
      { name: "cool people" },
      { name: "fun runners" },
      { name: "jedi in training people " },
    ],
  };

  if (!user.name) {
    return null;
  }

  const onMessagePress = () => {
    router.replace("/(subpages)/chat/direct/45");
  };

  return (
    <View style={[defaultStyles.container, styles.container]}>
      <View style={styles.header}>
        <Image source={{ uri: user.picture.large }} style={styles.avatar} />
        <Text style={styles.username}>
          {user.name.first} {user.name.last}
        </Text>
        <Text style={styles.location}>
          {user.location.city}, {user.location.country}
        </Text>
        <TouchableOpacity onPress={onMessagePress} style={styles.messageButton}>
          <Ionicons name="chatbox-outline" size={24} color="white" />
          <Text style={styles.messageButtonText}>
            Chat with {user.name.first}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </View>

      <View style={styles.groupsSection}>
        <Text style={styles.sectionTitle}>Groups ({user.groups.length})</Text>
        {user.groups && user.groups.length > 0 ? (
          <View style={styles.pillContainer}>
            {user.groups.map((group, index) => (
              <View key={index} style={styles.pill}>
                <Text style={styles.pillText}>{group.name}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noDataText}>No groups to display</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  messageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: primary.orange,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  messageButtonText: {
    color: "white",
    marginLeft: 10,
  },
  aboutSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 14,
    color: "#333",
  },
  groupsSection: {
    marginTop: 20,
  },
  pillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  pill: {
    backgroundColor: primary.lightgrey,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    margin: 5,
  },
  pillText: {
    fontSize: 14,
    color: "#333",
  },
  noDataText: {
    fontSize: 14,
    color: "#888",
  },
});

export default UserProfile;
