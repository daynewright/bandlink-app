import { View, Text } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";
import { useLocalSearchParams } from "expo-router";

const GroupChat = () => {
  const { id } = useLocalSearchParams();

  return (
    <View style={defaultStyles.container}>
      <Text>Group chat {id}</Text>
    </View>
  );
};

export default GroupChat;
