import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import { View } from "@/components/Themed";

import EventList from "@/components/Event/EventList";

export default function Feed() {
  return (
    <View style={styles.container}>
      <EventList />
      <Link href="/(modals)/login">Login</Link>
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
