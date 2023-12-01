import { ActivityIndicator, StyleSheet } from "react-native";
import { View } from "@/components/utils/Themed";

import EventList from "@/components/Event/EventList";
import { useGetLoggedInUser } from "@/hooks/api/profiles";
import { Redirect } from "expo-router";
import { useGetBandForUser } from "@/hooks/api/bands";

export default function Feed() {
  const { authUser, isLoading } = useGetLoggedInUser();

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : authUser ? (
        <EventList />
      ) : (
        <Redirect href="/(modals)/login" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
