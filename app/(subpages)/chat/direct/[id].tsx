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
import React, { useRef, useState } from "react";
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
import { useAddConversationByTypeId } from "@/hooks/api/conversations";

type Params = {
  id?: string;
  userId?: string;
};

const DirectChat = () => {
  const { id, userId } = useLocalSearchParams<Params>();
  const [convoId, setConvoId] = useState(id);

  const {
    data: messages,
    refetch: refetchMessages,
    isLoading: loadingMessages,
  } = useGetDirectMessagesByConversationId(convoId);

  console.log({ messages, convoId });

  const scrollViewRef = useRef<ScrollView>(null);
  const height = useHeaderHeight();

  const { data: me, isLoading: loadingMe } = useGetLoggedInProfile();
  const { mutateAsync: addUserConversation } =
    useAddConversationByTypeId("USER");
  const { mutateAsync: addMessage } = useAddMessageByConversationId(convoId);

  const isLoading = loadingMe || loadingMessages;

  const onSendMessage = async (message: string) => {
    Keyboard.dismiss();

    // if no conversation, create then add message
    if (convoId === "undefined") {
      const { data: newConvo, error: convoError } = await addUserConversation({
        userA: userId,
        userB: me?.id,
      });

      if (convoError) {
        Alert.alert("Oops! Can't send a message right now.");
      }
      if (newConvo) {
        const { data: newMessage, error: messageError } = await addMessage({
          userId: me?.id,
          conversationId: newConvo.id,
          message,
        });

        if (messageError) {
          Alert.alert("Oops! Can't send a message right now.");
        }
        if (newMessage) {
          setConvoId(newConvo.id);
        }
      }
    } else {
      //if conversation, just add message
      const { data, error } = await addMessage({
        conversationId: convoId,
        userId: me?.id,
        message,
      });

      console.log({ error });

      if (data) {
        await refetchMessages();
      }

      if (error) {
        Alert.alert("Oops! Can't send a message right now.");
      }
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
                    key={m.message_id}
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
