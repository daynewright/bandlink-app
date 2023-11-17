import { Text, View } from "@/components/utils/Themed";
import { primary } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { TextInput, TouchableOpacity } from "react-native";

export default function Login() {
  const router = useRouter();

  return (
    <View style={defaultStyles.container}>
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
        <Text style={defaultStyles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={defaultStyles.textLink}
        onPress={() => router.replace("/(modals)/signup")}
      >
        <Text style={{ color: primary.darkgrey }}>or sign up</Text>
      </TouchableOpacity>
    </View>
  );
}
