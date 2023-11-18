import { Text, View } from "@/components/utils/Themed";
import { defaultStyles } from "@/constants/Styles";

import ChatDirectList from "@/components/Chat/ChatDirectList";

const Chat = () => {
  return (
    <View style={defaultStyles.container}>
      <ChatDirectList />
    </View>
  );
};

export default Chat;
