import React, { useRef, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { primary } from "@/constants/Colors";

type Props = {
  photos: { uri: string }[];
};

const generateRandomPhoto = () => {
  return `https://picsum.photos/id/${
    Math.floor(Math.random() * 40) + 1
  }/600/800`;
};

const samplePhotos = Array.from({ length: 10 }, (_, index) => ({
  uri: generateRandomPhoto(),
}));

const screenWidth = Dimensions.get("window").width;

const PhotosFullView = ({ photos = samplePhotos }: Props) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const mainScrollViewRef = useRef<ScrollView>(null);
  const miniStripRef = useRef<ScrollView>(null);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (mainScrollViewRef.current) {
      mainScrollViewRef.current.scrollTo({
        x: screenWidth * index,
        animated: true,
      });
    }
  };

  const handleMiniImagePress = (index: number) => {
    scrollToIndex(index);
    setSelectedImageIndex(index);
  };

  const handleScrollEnd = (event: any) => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / screenWidth);
    setSelectedImageIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={mainScrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.fullScreenScrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleScrollEnd}
      >
        {photos.map((photo, index) => (
          <View key={index} style={styles.fullScreenImageContainer}>
            <Image source={{ uri: photo.uri }} style={styles.fullScreenImage} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.miniStripContainer}>
        <ScrollView
          ref={miniStripRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.miniStrip}
        >
          {photos.map((photo, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.miniImageContainer,
                index === selectedImageIndex
                  ? styles.selectedMiniImageContainer
                  : styles.disabledMiniImageContainer,
              ]}
              onPress={() => handleMiniImagePress(index)}
              activeOpacity={0.7}
            >
              <Image source={{ uri: photo.uri }} style={styles.miniImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreenScrollView: {
    flex: 1,
  },
  fullScreenImageContainer: {
    width: screenWidth,
  },
  fullScreenImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "contain",
  },
  miniStripContainer: {
    marginTop: 8,
    marginBottom: 35,
    maxHeight: 50,
  },
  miniStrip: {},
  miniImageContainer: {
    width: 50,
    height: 50,
    marginRight: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: primary.lightgrey,
  },
  selectedMiniImageContainer: {
    backgroundColor: primary.lightgrey,
  },
  disabledMiniImageContainer: {
    opacity: 0.5,
  },
  miniImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
});

export default PhotosFullView;
