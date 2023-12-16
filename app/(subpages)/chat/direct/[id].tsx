import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useRef } from "react";
import { defaultStyles } from "@/constants/Styles";
import { useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";

import ChatMessage from "@/components/Chat/ChatMessage";
import ChatUnreadNotification from "@/components/Chat/ChatUnreadNotification";
import ChatMessageInput from "@/components/Chat/ChatMessageInput";

import {
  useGetDirectMessagesByConversationId,
  useAddMessageByConversationId,
} from "@/hooks/api/messages";
import getReadableDateFrom from "@/utils/getReadableDateFrom";
import { useGetLoggedInProfile } from "@/hooks/api/profiles";

const DirectChat = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: me, isLoading: loadingMe } = useGetLoggedInProfile();
  const {
    data: messages,
    refetch: refetchMessages,
    isLoading: loadingMessages,
  } = useGetDirectMessagesByConversationId(id);
  const { mutateAsync: addMessage } = useAddMessageByConversationId(id);

  const scrollViewRef = useRef<ScrollView>(null);
  const height = useHeaderHeight();

  const isLoading = loadingMe || loadingMessages;

  const onSendMessage = async (message: string) => {
    Keyboard.dismiss();
    const { data, error } = await addMessage({
      conversationId: id,
      userId: me?.id,
      message,
    });

    if (data) {
      await refetchMessages();
    }

    if (error) {
      Alert.alert("Oops! Can't send a message right now.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={height - 225}
      style={{ flex: 1 }}
    >
      <View style={defaultStyles.container}>
        {isLoading ? (
          <ActivityIndicator style={styles.loader} size="large" />
        ) : (
          <>
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
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
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
