import { TouchableOpacity, StyleSheet } from "react-native";
import { primary } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "@/components/utils/Themed";
import { useRouter } from "expo-router";

const EventActionRow = ({
  attendanceCount = 0,
  commentCount = 0,
  eventId,
}: {
  attendanceCount: number;
  commentCount: number;
  eventId: string;
}) => {
  const router = useRouter();
  return (
    <View style={styles.actionsContainer}>
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="person-add-outline" size={20} />
        <Text style={styles.actionText}>{attendanceCount}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => router.push(`/(subpages)/event/${eventId}/comments`)}
      >
        <Ionicons name="chatbubbles-outline" size={20} />
        <Text style={styles.actionText}>{commentCount}</Text>
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
    color: primary.darkgrey,
  },
  actionText: {
    marginLeft: 6,
    color: primary.darkgrey,
  },
});
