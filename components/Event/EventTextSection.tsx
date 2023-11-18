import { TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

import { View, Text } from "@/components/utils/Themed";
import { primary } from "@/constants/Colors";

type Props = {
  text: string;
  expandable?: boolean;
};

const EventTextSection = ({ text, expandable = false }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const renderExpandButtons = () => {
    if (!expandable) return null;

    return (
      <>
        {!expanded ? (
          <TouchableOpacity onPress={toggleExpansion}>
            <Text style={styles.readMoreButton}>Read More</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleExpansion}>
            <Text style={styles.readMoreButton}>Read Less</Text>
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <View style={styles.textSection}>
      <Text style={styles.aboutTitle}>About the Event</Text>
      <Text
        numberOfLines={expandable ? (expanded ? 0 : 3) : undefined}
        style={styles.aboutText}
      >
        {text}
      </Text>

      {renderExpandButtons()}
    </View>
  );
};

export default EventTextSection;

const styles = StyleSheet.create({
  textSection: {
    padding: 10,
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  aboutText: {
    fontSize: 14,
    color: "grey",
    marginTop: 5,
  },
  readMoreButton: {
    color: primary.orange,
    textDecorationLine: "underline",
    marginTop: 5,
  },
});
