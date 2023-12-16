import { useRef } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { View, Text } from "@/components/utils/Themed";
import { useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";

import ChatMessage from "@/components/Chat/ChatMessage";
import ChatMessageInput from "@/components/Chat/ChatMessageInput";
import { defaultStyles } from "@/constants/Styles";
import getReadableDateFrom from "@/utils/getReadableDateFrom";
import { useGetEventCommentsById } from "@/hooks/api/messages";
import { useGetLoggedInProfile } from "@/hooks/api/profiles";
import { useAddMessageByConversationId } from "@/hooks/api/messages/useAddMessageByConversationId";
import { useGetConversationByTypeId } from "@/hooks/api/conversations";

const Comments = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: me, isLoading: loadingMe } = useGetLoggedInProfile();
  const { data: conversation, isLoading: loadingConvo } =
    useGetConversationByTypeId("EVENT", id);
  const {
    data: comments,
    refetch: refetchComments,
    isLoading: loadingComments,
  } = useGetEventCommentsById(id);

  const scrollViewRef = useRef<ScrollView>(null);
  const height = useHeaderHeight();

  const isLoading = loadingMe || loadingConvo || loadingComments;

  const { mutateAsync: addMessage } = useAddMessageByConversationId(id);

  const onSendMessage = async (message: string) => {
    Keyboard.dismiss();
    const { data, error } = await addMessage({
      userId: me?.id,
      conversationId: conversation?.id,
      message,
    });

    if (error) {
      Alert.alert("Oops! Can't add a comment right now.");
    }

    if (data) {
      await refetchComments();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={height - 225}
      style={{ flex: 1 }}
      enabled
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
                {comments?.length ? (
                  comments?.map((c) => (
                    <ChatMessage
                      key={`${c.conversation_id}-${c.created_at}`}
                      message={c.message}
                      userId={c.sender_user_id}
                      timestamp={getReadableDateFrom(c.created_at).readableDate}
                    />
                  ))
                ) : (
                  <View style={styles.empty}>
                    <Text>It is pretty quiet in here.</Text>
                    <Text>Add a comment! 👋</Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </>
        )}
        <ChatMessageInput onSendMessage={onSendMessage} />
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
  empty: {
    alignItems: "center",
    marginTop: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});

export default Comments;
