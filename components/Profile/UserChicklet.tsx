import { supabase } from "@/clients/supabase";
import { primary } from "@/constants/Colors";
import { useGetProfileById } from "@/hooks/api/profiles";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  userId: string;
};

const UserChicklet = ({ userId }: Props) => {
  const router = useRouter();
  const { data: user, error: userError } = useGetProfileById(userId);

  const userInitials = user?.first_name
    ? `${user.first_name.charAt(0)}${user.last_name?.charAt(0) ?? ""}`
    : "";

  return (
    <TouchableOpacity
      onPress={() => router.push(`/(modals)/(profile)/${user?.id}`)}
    >
      <View style={styles.userInfoContainer}>
        <View style={styles.avatarContainer}>
          {user?.image_url ? (
            <Image source={{ uri: user.image_url }} style={styles.avatar} />
          ) : (
            <View style={styles.initialsContainer}>
              <Text style={styles.initials}>{userInitials}</Text>
            </View>
          )}
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.name}>{`${user?.first_name ?? "Unknown"} ${
            user?.last_name ?? ""
          }`}</Text>
          <Text style={styles.headline}>{user?.title}</Text>
          <Text style={styles.section}>Section - Role</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  initialsContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: primary.orange,
    opacity: 0.75,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  initials: {
    color: primary.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  userInfoContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
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
