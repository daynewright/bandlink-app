import React from "react";
import { Image, StyleSheet } from "react-native";
import { View } from "@/components/utils/Themed";

// TODO:  Get Google API key to allow use of maps //

const EventStaticMap = () => {
  // Replace these coordinates with the desired location
  const latitude = 37.7749;
  const longitude = -122.4194;

  // Replace YOUR_API_KEY with your actual Google Maps API key (optional)
  const apiKey = "YOUR_API_KEY";
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=400x400&markers=color:red%7C${latitude},${longitude}&key=${apiKey}`;

  console.log({ mapUrl });

  return (
    <View style={styles.container}>
      <Image source={{ uri: mapUrl }} style={styles.map} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: 300,
    height: 300,
  },
});

export default EventStaticMap;
