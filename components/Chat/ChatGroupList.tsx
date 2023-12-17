import { useRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Pressable,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import ChatGroupPreviewCard from "@/components/Chat/ChatGroupPreviewCard";

import { useGetLoggedInProfile } from "@/hooks/api/profiles";
import { useGetGroupConversationsByUserId } from "@/hooks/api/conversations";
import getReadableDateFrom from "@/utils/getReadableDateFrom";

const ChatDirectList = () => {
  const eventListRef = useRef<FlatList>(null);

  const { data: user } = useGetLoggedInProfile();

  const { data: groupConversations, isLoading: loadingGroups } =
    useGetGroupConversationsByUserId(user?.id);

  const RenderFeedItem: ListRenderItem<any> = ({ item }) => {
    // need to get image for the group //
    return (
      <Link href={`/(subpages)/chat/group/${item.conversation_id}`} asChild>
        <Pressable>
          <ChatGroupPreviewCard
            group={item.group_name}
            time={
              getReadableDateFrom(item.latest_message_date).readableDistance
            }
            avatar={`https://picsum.photos/${
              Math.floor(Math.random() * 40) + 1
            }/200`}
            memberCount={item.users_count}
          />
        </Pressable>
      </Link>
    );
  };

  const RenderEmpty = () => {
    return (
      <View style={styles.empty}>
        <Text>No group leaders have started conversations. 😔</Text>
      </View>
    );
  };

  return (
    <View style={{ width: "100%", flex: 1 }}>
      {loadingGroups ? (
        <ActivityIndicator size="small" />
      ) : (
        <FlatList
          ref={eventListRef}
          data={groupConversations}
          ListEmptyComponent={RenderEmpty}
          renderItem={RenderFeedItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    margin: 25,
  },
});

export default ChatDirectList;
