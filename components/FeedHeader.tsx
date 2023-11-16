import { View, Text } from "@/components/Themed";
import { Image } from "react-native";

const FeedHeader = ({ imageId }: { imageId: string }) => {
  const uri = `https://randomuser.me/api/portraits/med/men/${imageId ?? 1}.jpg`;

  return (
    <View>
      <Image
        source={{ uri }}
        style={{
          width: 25,
          height: 25,
          borderRadius: 50,
        }}
      />
      <Text>FEED HEADER</Text>
    </View>
  );
};

export default FeedHeader;
