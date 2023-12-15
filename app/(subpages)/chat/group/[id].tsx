import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import ChatMessage from "@/components/Chat/ChatMessage";
import ChatUnreadNotification from "@/components/Chat/ChatUnreadNotification";
import ChatMessageInput from "@/components/Chat/ChatMessageInput";

import { useGetGroupMessagesByConversationId } from "@/hooks/api/messages";
import getReadableDateFrom from "@/utils/getReadableDateFrom";
import { Ionicons } from "@expo/vector-icons";

const GroupChat = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: messages } = useGetGroupMessagesByConversationId(id);

  return (
    <View style={defaultStyles.container}>
      <View style={styles.topContent}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {messages?.length ? (
            messages?.map((m) => (
              <ChatMessage
                key={m.message_id}
                message={m.message}
                userId={m.user_id}
                timestamp={getReadableDateFrom(m.created_at).readableDate}
              />
            ))
          ) : (
            <View style={styles.empty}>
              <Text>It is pretty quiet in here.</Text>
              <Text>Start the conversation! 👋</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <ChatMessageInput onSendMessage={() => null} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContent: {
    flex: 1,
  },
  empty: {
    alignItems: "center",
    marginTop: 20,
  },
  scrollViewContent: {
    justifyContent: "flex-end",
  },
});

export default GroupChat;
