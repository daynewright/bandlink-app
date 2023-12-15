import { primary } from "@/constants/Colors";
import { UserData } from "@/hooks/api/profiles";
import { View, Text, StyleSheet, Image } from "react-native";

type Props = {
  user?: UserData;
  backgroundColor?: string;
};

const UserAvatar = ({ user, backgroundColor = primary.orange }: Props) => {
  const userInitials = user?.first_name
    ? `${user?.first_name.charAt(0)}${user.last_name?.charAt(0) ?? ""}`
    : "";

  return (
    <View style={styles.avatarContainer}>
      {user?.image_url ? (
        <Image source={{ uri: user.image_url }} style={styles.avatar} />
      ) : (
        <View style={[styles.initialsContainer, { backgroundColor }]}>
          <Text style={styles.initials}>{userInitials}</Text>
        </View>
      )}
    </View>
  );
};

export default UserAvatar;

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
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    color: primary.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
