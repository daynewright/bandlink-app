import UserChicklet from "@/components/Profile/UserChicklet";
import { primary } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useGetAttendeesByEventId } from "@/hooks/api/events/useGetAttendeesByEventId";
import useGetUsers from "@/mockData/userGetUsers";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TextInput } from "react-native";

const UserList = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: users } = useGetAttendeesByEventId(id);

  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFilteredUsers] = useState(users);

  useEffect(() => {
    if (users?.length) {
      setFilteredUsers(users);
    }
  }, [users?.length]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    const filtered =
      query.length > 0
        ? users?.filter(
            (user: any) =>
              user.first_name.toLowerCase().includes(query.toLowerCase()) ||
              user.last_name.toLowerCase().includes(query.toLowerCase())
          )
        : users;

    setFilteredUsers(filtered);
  };

  return (
    <View style={defaultStyles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <UserChicklet userId={item.id} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  userContainer: {
    margin: 5,
  },
  searchInput: {
    height: 40,
    borderColor: primary.lightgrey,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    margin: 10,
  },
});

export default UserList;
