import { ScrollView, StyleSheet } from "react-native";
import { View, Text } from "@/components/utils/Themed";
import { useLocalSearchParams } from "expo-router";

import ChatMessage from "@/components/Chat/ChatMessage";
import ChatMessageInput from "@/components/Chat/ChatMessageInput";
import { defaultStyles } from "@/constants/Styles";
import getReadableDateFrom from "@/utils/getReadableDateFrom";
import { useGetEventCommentsById } from "@/hooks/api/messages";

const Comments = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: comments } = useGetEventCommentsById(id);

  console.log(JSON.stringify(comments, null, 2));

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
                key={c.conversation_id}
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

export default Comments;
