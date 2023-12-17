import { primary } from "@/constants/Colors";
import { useGetGroupsByUserId } from "@/hooks/api/groups";
import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const UserGroups = ({ userId }: { userId?: string }) => {
  const { data: groups, isLoading: loadingGroups } =
    useGetGroupsByUserId(userId);

  return (
    <View style={styles.groupsSection}>
      {loadingGroups ? (
        <ActivityIndicator size="small" />
      ) : (
        <>
          <Text style={styles.sectionTitle}>
            Groups ({groups?.length ?? 0})
          </Text>
          {groups && groups.length > 0 ? (
            <View style={styles.pillContainer}>
              {groups.map((group: any) => (
                <View key={group.id} style={styles.pill}>
                  <Text style={styles.pillText}>{group.group_name}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noDataText}>No groups to display</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  groupsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
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

export default UserGroups;
