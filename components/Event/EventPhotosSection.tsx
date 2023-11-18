import { primary } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { Image, FlatList, StyleSheet, Pressable } from "react-native";
import { View, Text } from "@/components/utils/Themed";

type Props = {
  photos: {
    label?: string;
    uri: string;
  }[];
};

const EventPhotoSection = ({ photos }: Props) => {
  const router = useRouter();

  const gotToPhotos = () => {
    router.push("/(subpages)/event/45/photosFullView");
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={gotToPhotos}>
        <Text style={styles.title}>Photos ({photos.length})</Text>
      </Pressable>
      <FlatList
        data={photos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={gotToPhotos}>
            <Image source={{ uri: item.uri }} style={styles.photo} />
          </Pressable>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  photo: {
    width: 125,
    height: 100,
    borderRadius: 8,
    borderColor: primary.lightgrey,
    borderWidth: StyleSheet.hairlineWidth,
    marginRight: 8,
  },
});

export default EventPhotoSection;
