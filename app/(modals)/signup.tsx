import { TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Text, View } from "@/components/utils/Themed";
import { primary } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

export default function SignUp() {
  const router = useRouter();

  return (
    <View style={[defaultStyles.container, styles.container]}>
      <Text style={styles.h1}>Bandlink</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="First name"
        secureTextEntry={true}
        style={defaultStyles.inputField}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="Last name"
        secureTextEntry={true}
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={defaultStyles.inputField}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="Password"
        secureTextEntry={true}
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />

      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={defaultStyles.textLink}
        onPress={() => router.replace("/(modals)/login")}
      >
        <Text style={{ color: primary.darkgrey }}>or login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  h1: {
    fontSize: 34,
    marginBottom: 10,
  },
});
