import { Text, View } from "@/components/Themed";
import { primary } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { TextInput, TouchableOpacity } from "react-native";

export default function SignUp() {
  const router = useRouter();

  return (
    <View style={defaultStyles.container}>
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
