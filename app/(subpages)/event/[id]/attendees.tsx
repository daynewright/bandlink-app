import UserChicklet from "@/components/Profile/UserChicklet";
import { primary } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import useGetUsers from "@/mockData/userGetUsers";
import { UserInfo } from "@/types/user";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TextInput } from "react-native";

const UserList = () => {
  // TODO: fix this mock data.  Pass it in? Use reactQuery?
  const users = useGetUsers(35);

  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFilteredUsers] = useState<UserInfo[]>(users);

  useEffect(() => {
    if (users.length > 0) {
      setFilteredUsers(users);
    }
  }, [users.length]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    const filtered =
      query.length > 0
        ? users?.filter(
            (user: UserInfo) =>
              user.name.first.toLowerCase().includes(query.toLowerCase()) ||
              user.name.last.toLowerCase().includes(query.toLowerCase())
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
        keyExtractor={(item) => item.cell.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <UserChicklet
              username={`${item.name.first} ${item.name.last}`}
              avatarUri={item.picture.medium}
              headline={item.location.street.name}
            />
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
