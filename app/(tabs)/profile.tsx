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

import { useGetGroupsByUserId } from "@/hooks/api/groups";
import {
  useGetEventsByGroupId,
  useGetSingleEventWithDetails,
} from "@/hooks/api/events";
import {
  useGetLoggedInUser,
  useGetLoggedInProfile,
} from "@/hooks/api/profiles";
import { useGetConversationByTypeId } from "@/hooks/api/conversations";

export default function Profile() {
  const { authUser, isLoading } = useGetLoggedInUser();

  // const { data: loggedInUserProfile } = useGetLoggedInProfile();
  // const { data: loggedInUserGroups } = useGetGroupsByUserId(
  //   loggedInUserProfile?.id
  // );

  // const { data: eventsByGroupId } = useGetEventsByGroupId(
  //   "9ed61ea1-a7d3-47fa-808a-25162973e3df"
  // );

  // const { data: convo, error } = useGetConversationByTypeId(
  //   "USER",
  //   "02035133-eb13-47c3-8e40-6664c7c335ef"
  // );

  const { data: event, error } = useGetSingleEventWithDetails(
    "db6d3c61-9e5b-4c3a-b8b9-1c2f71d3e0f5"
  );

  // console.log(JSON.stringify(eventsByGroupId, null, 2));
  // const loggedInUserProfile = useProfileStore((state) =>
  //   state.profiles.find((p) => p.auth_user_id === authUser?.id)
  // );

  // const { data, error } = useGetBandById(
  //   "9bebd8a9-1354-459a-81a8-45dd9150e665"
  // );

  // const { data, error } = useGetGroupById(
  //   "9ed61ea1-a7d3-47fa-808a-25162973e3df"
  // );

  // const { data, error } = useGetGroupsByBandId(
  //   "9bebd8a9-1354-459a-81a8-45dd9150e665"
  // );

  // const { data: groups, error } = useGetGroupsByUserId(profile?.id!);

  // console.log(JSON.stringify(error, null, 2));

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
      {/* <Text>{JSON.stringify(loggedInUserProfile, null, 2)}</Text>
      <Text>{JSON.stringify(loggedInUserGroups, null, 2)}</Text> */}
      <Text>{JSON.stringify(event, null, 2)}</Text>
      <TouchableOpacity style={defaultStyles.btn} onPress={logoutUser}>
        <Text style={defaultStyles.btnText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

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
