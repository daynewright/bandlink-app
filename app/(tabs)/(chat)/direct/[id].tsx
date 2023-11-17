import { View, Text } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";
import { useLocalSearchParams, useRouter } from "expo-router";

const DirectChat = () => {
  const { id } = useLocalSearchParams();

  return (
    <View style={defaultStyles.container}>
      <Text>CHAT FEED {id}</Text>
    </View>
  );
};

export default DirectChat;
