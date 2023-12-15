import { useRef } from "react";
import { FlatList, ListRenderItem, Pressable, View } from "react-native";
import { Link } from "expo-router";
import bandEvents from "@/mockData/events";

import ChatDirectPreviewCard from "@/components/Chat/ChatDirectPreviewCard";
import { useGetLoggedInProfile } from "@/hooks/api/profiles";
import { useGetDirectConversationsByUserId } from "@/hooks/api/conversations";
import getReadableDateFrom from "@/utils/getReadableDateFrom";

const ChatDirectList = () => {
  const eventListRef = useRef<FlatList>(null);

  const { data: user } = useGetLoggedInProfile();
  const { data: convos } = useGetDirectConversationsByUserId(user?.id);

  const RenderFeedItem: ListRenderItem<any> = ({ item }) => {
    const readableTime = getReadableDateFrom(
      item.latest_message_date
    ).readableTime;

    return (
      <Link href={`/(subpages)/chat/direct/${item.conversation_id}`} asChild>
        <Pressable>
          <ChatDirectPreviewCard
            sender={item.other_user_name}
            message={item.latest_message}
            time={readableTime}
          />
        </Pressable>
      </Link>
    );
  };

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <FlatList ref={eventListRef} data={convos} renderItem={RenderFeedItem} />
    </View>
  );
};

export default ChatDirectList;
