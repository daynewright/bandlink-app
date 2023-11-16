import { TouchableOpacity, StyleSheet } from "react-native";
import { primary } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "@/components/Themed";

const EventActionRow = () => {
  return (
    <View style={styles.actionsContainer}>
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="person-add-outline" size={20} />
        <Text style={styles.actionText}>5</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="chatbox-outline" size={20} />
        <Text style={styles.actionText}>10</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="calendar-outline" size={20} color={primary.darkgrey} />
      </TouchableOpacity>
    </View>
  );
};

export default EventActionRow;

const styles = StyleSheet.create({
  actionsContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    margin: 10,
    gap: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    color: primary.lightgrey,
  },
  actionText: {
    marginLeft: 6,
    color: "#555",
  },
});
