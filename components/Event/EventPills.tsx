import { StyleSheet } from "react-native";

import { View, Text } from "@/components/utils/Themed";
import { primary } from "@/constants/Colors";

const EventPills = ({ pills }: { pills?: string[] }) => {
  return (
    <View style={styles.pillContainer}>
      {pills?.map((pill, index) => (
        <View key={index} style={styles.pill}>
          <Text style={styles.pillText}>{pill}</Text>
        </View>
      ))}
    </View>
  );
};

export default EventPills;

const styles = StyleSheet.create({
  pillContainer: {
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "transparent",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  pill: {
    backgroundColor: primary.orange,
    borderRadius: 5,
    marginRight: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  pillText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
  },
});
