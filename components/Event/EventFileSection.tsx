import React from "react";
import { StyleSheet, Linking, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { primary } from "@/constants/Colors";
import { View, Text } from "@/components/utils/Themed";

type File = {
  name: string;
  url: string;
};

type Props = {
  files: {
    name: string;
    url: string;
  }[];
};

const EventFileSection = ({ files }: Props) => {
  const handleDownload = async (file: File) => {
    try {
      await Linking.openURL(file.url);
    } catch (e) {
      Alert.alert("Unable to open this file");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Files ({files.length})</Text>
      <View style={styles.fileContainer}>
        {files.map((file, index) => (
          <TouchableOpacity key={index} onPress={() => handleDownload(file)}>
            <View style={styles.fileWrapper}>
              <Ionicons name="file-tray" size={20} color={primary.darkgrey} />
              <Text style={styles.fileName}>{file.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
  fileContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  fileWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  fileName: {
    marginLeft: 10,
    color: primary.darkgrey,
  },
});

export default EventFileSection;
