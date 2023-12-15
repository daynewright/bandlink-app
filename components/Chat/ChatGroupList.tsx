import { useRef } from "react";
import { FlatList, ListRenderItem, Pressable, View } from "react-native";
import { Link } from "expo-router";
import ChatGroupPreviewCard from "@/components/Chat/ChatGroupPreviewCard";

import { useGetLoggedInProfile } from "@/hooks/api/profiles";
import { useGetGroupConversationsByUserId } from "@/hooks/api/conversations";
import getReadableDateFrom from "@/utils/getReadableDateFrom";

const ChatDirectList = () => {
  const eventListRef = useRef<FlatList>(null);

  const { data: user } = useGetLoggedInProfile();
  const { data: groupConversations, error } = useGetGroupConversationsByUserId(
    user?.id
  );

  console.log(JSON.stringify(groupConversations, null, 2), error);

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

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <FlatList
        ref={eventListRef}
        data={groupConversations}
        renderItem={RenderFeedItem}
      />
    </View>
  );
};

export default ChatDirectList;
