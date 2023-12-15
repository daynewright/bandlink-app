import { Alert, ScrollView, StyleSheet } from "react-native";
import { View, Text } from "@/components/utils/Themed";
import { useLocalSearchParams } from "expo-router";

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
  const { data: me } = useGetLoggedInProfile();
  const { data: conversation } = useGetConversationByTypeId("EVENT", id);
  const { data: comments, refetch: refetchComments } =
    useGetEventCommentsById(id);

  const { mutateAsync: addMessage } = useAddMessageByConversationId(id);

  const onSendMessage = async (message: string) => {
    const { data, error } = await addMessage({
      userId: me?.id,
      conversationId: conversation?.id,
      message,
    });

    if (error) {
      Alert.alert("Oops! Can't add a comment right now.");
    }

    console.log({ data, error });

    if (data) {
      await refetchComments();
    }
  };

  return (
    <View style={defaultStyles.container}>
      <View style={styles.topContent}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
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
      <ChatMessageInput onSendMessage={onSendMessage} />
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

export default Comments;
