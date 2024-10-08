import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

import { defaultStyles } from "@/constants/Styles";
import { primary } from "@/constants/Colors";
import { useGetLoggedInProfile, useGetProfileById } from "@/hooks/api/profiles";
import { useGetConversationByTypeId } from "@/hooks/api/conversations";
import UserGroups from "@/components/Profile/UserGroups";

const UserProfile = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: me } = useGetLoggedInProfile();
  const { data: user } = useGetProfileById(id);
  const { data: conversation } = useGetConversationByTypeId("USER", user?.id);

  const userInitials = user?.first_name
    ? `${user.first_name.charAt(0)}${user.last_name?.charAt(0)}`
    : "";

  const onMessagePress = () => {
    if (user?.id) {
      router.replace({
        pathname: `/(subpages)/chat/direct/${conversation?.id}`,
        params: { userId: user.id },
      });
    } else {
      Alert.alert("Oops, unable to chat at the moment");
    }
  };

  return (
    <View style={[defaultStyles.container, styles.container]}>
      <View style={styles.header}>
        <View>
          {user?.image_url ? (
            <Image source={{ uri: user.image_url }} style={styles.avatar} />
          ) : (
            <View style={styles.initialsContainer}>
              <Text style={styles.initials}>{userInitials}</Text>
            </View>
          )}
        </View>
        <Text style={styles.username}>
          {user?.first_name} {user?.last_name}
        </Text>
        {me?.id !== user?.id ? (
          <TouchableOpacity
            onPress={onMessagePress}
            style={styles.messageButton}
          >
            <Ionicons name="chatbox-outline" size={24} color="white" />
            <Text style={styles.messageButtonText}>
              Chat with {user?.first_name ?? "Me"}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text>This is you! 😀</Text>
        )}
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>
          {user?.about ?? "I am still working on my profile. Say Hi!"}
        </Text>
      </View>

      <UserGroups userId={user?.id} />
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
  initialsContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    backgroundColor: primary.orange,
    opacity: 0.75,
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    color: primary.white,
    fontSize: 30,
    fontWeight: "bold",
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
