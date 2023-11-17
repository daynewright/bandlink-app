import { View } from "@/components/utils/Themed";
import { defaultStyles } from "@/constants/Styles";

import ChatGroupList from "@/components/Chat/ChatGroupList";

const Groups = () => {
  return (
    <View style={defaultStyles.container}>
      <ChatGroupList />
    </View>
  );
};

export default Groups;
