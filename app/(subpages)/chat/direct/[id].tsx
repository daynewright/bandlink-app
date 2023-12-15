import { View, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";
import { useLocalSearchParams } from "expo-router";
import ChatMessage from "@/components/Chat/ChatMessage";
import ChatUnreadNotification from "@/components/Chat/ChatUnreadNotification";
import ChatMessageInput from "@/components/Chat/ChatMessageInput";
import { useGetDirectMessagesByConversationId } from "@/hooks/api/messages";
import getReadableDateFrom from "@/utils/getReadableDateFrom";

const DirectChat = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: messages } = useGetDirectMessagesByConversationId(id);

  console.log(JSON.stringify(messages, null, 2));

  return (
    <View style={defaultStyles.container}>
      <View style={styles.topContent}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {messages?.map((m) => (
            <ChatMessage
              userId={m.sender_id}
              message={m.message}
              timestamp={getReadableDateFrom(m.created_at).readableDate}
            />
          ))}
          {/* <ChatMessage
            message="test message"
            isCurrentUser
            user={{
              name: "Jony Joe",
              avatar: `https://picsum.photos/${
                Math.floor(Math.random() * 40) + 1
              }/200`,
            }}
            timestamp="Fri, Aug 10, 2022 - 10:30pm"
          />
          <ChatUnreadNotification />
          <ChatMessage
            message="This is a really long message that I want to add to this chat"
            isCurrentUser={false}
            user={{
              name: "Mike Mark",
              avatar: `https://picsum.photos/${
                Math.floor(Math.random() * 40) + 1
              }/200`,
            }}
            timestamp="Fri, Aug 10, 2022 - 11:30pm"
          />
          <ChatMessage
            message="that is a great message. Thanks for adding it and telling me about it."
            isCurrentUser={false}
            user={{
              name: "Mike Mark",
              avatar: `https://picsum.photos/${
                Math.floor(Math.random() * 40) + 1
              }/200`,
            }}
            timestamp="Fri, Aug 10, 2022 - 11:45pm"
          /> */}
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
  scrollViewContent: {
    justifyContent: "flex-end",
  },
});

export default DirectChat;
