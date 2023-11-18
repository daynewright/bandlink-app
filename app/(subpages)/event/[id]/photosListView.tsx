import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { primary } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { defaultStyles } from "@/constants/Styles";

type Props = {
  photos?: { uri: string }[];
};

const generateRandomPhoto = () => {
  return `https://picsum.photos/id/${
    Math.floor(Math.random() * 40) + 1
  }/600/800`;
};

const samplePhotos = Array.from({ length: 20 }, (_, index) => ({
  uri: generateRandomPhoto(),
}));

const Photos = ({ photos = samplePhotos }: Props) => {
  const router = useRouter();

  const renderPhotoItem = ({
    item,
  }: {
    item: { uri: string };
    index: number;
  }) => <Image source={{ uri: item.uri }} style={styles.photo} />;

  return (
    <View style={defaultStyles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Event Name Photos</Text>
        <FlatList
          data={photos}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderPhotoItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    margin: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
  },
  photo: {
    flex: 1,
    height: 150,
    aspectRatio: 1, // Maintain aspect ratio
    borderRadius: 8,
    margin: 5,
    borderColor: primary.lightgrey,
    borderWidth: StyleSheet.hairlineWidth,
  },
  row: {
    justifyContent: "space-evenly",
  },
});

export default Photos;
