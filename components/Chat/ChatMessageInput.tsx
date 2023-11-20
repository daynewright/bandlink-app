import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { primary } from "@/constants/Colors";

type MessageInputProps = {
  onSendMessage: (message: string) => void;
};

const ChatMessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={(text) => setMessage(text)}
          multiline
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          disabled={!message.length}
          style={[styles.sendButton, { opacity: !message.length ? 0.5 : 1 }]}
        >
          <Ionicons name="send" size={20} color={primary.darkgrey} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    borderRadius: 8,
    borderColor: primary.darkgrey,
    borderWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  sendButton: {
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChatMessageInput;
