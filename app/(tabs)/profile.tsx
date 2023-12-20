import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { defaultStyles } from "@/constants/Styles";
import { Text, View } from "@/components/utils/Themed";
import { supabase } from "@/clients/supabase";
import { Redirect } from "expo-router";

import {
  useGetLoggedInProfile,
  useGetLoggedInUser,
} from "@/hooks/api/profiles";
import UserAvatar from "@/components/Profile/UserAvatar";
import UserGroups from "@/components/Profile/UserGroups";

const Profile = () => {
  const { authUser, isLoading } = useGetLoggedInUser();
  const { data: me } = useGetLoggedInProfile();

  const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert(error.message);
  };

  if (!authUser && !isLoading) {
    return <Redirect href="/(modals)/login" />;
  }

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <UserAvatar user={me} />
      <Text>
        {me?.first_name} {me?.last_name}
      </Text>
      <Text>{me?.about}</Text>
      <UserGroups userId={me?.id} />
      <TouchableOpacity style={defaultStyles.btn} onPress={logoutUser}>
        <Text style={defaultStyles.btnText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default Profile;
