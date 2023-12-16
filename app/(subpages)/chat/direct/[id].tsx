import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import React, { useRef } from "react";
import { defaultStyles } from "@/constants/Styles";
import { useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";

import ChatMessage from "@/components/Chat/ChatMessage";
import ChatUnreadNotification from "@/components/Chat/ChatUnreadNotification";
import ChatMessageInput from "@/components/Chat/ChatMessageInput";
import { useGetDirectMessagesByConversationId } from "@/hooks/api/messages";
import getReadableDateFrom from "@/utils/getReadableDateFrom";

const DirectChat = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: messages } = useGetDirectMessagesByConversationId(id);

  const scrollViewRef = useRef<ScrollView>(null);
  const height = useHeaderHeight();

  const onSendMessage = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={height - 225}
      style={{ flex: 1 }}
    >
      <View style={defaultStyles.container}>
        <View style={styles.topContent}>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => {
              scrollViewRef.current?.scrollToEnd();
            }}
          >
            {messages?.map((m) => (
              <ChatMessage
                userId={m.sender_id}
                message={m.message}
                timestamp={getReadableDateFrom(m.created_at).readableDate}
              />
            ))}
          </ScrollView>
        </View>
        <ChatMessageInput onSendMessage={onSendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContent: {
    flex: 1,
  },
  scrollViewContent: {
    justifyContent: "flex-end",
  },
});

export default DirectChat;
