import { TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Redirect, useRouter } from "expo-router";

import { supabase } from "@/clients/supabase";
import { Text, View } from "@/components/utils/Themed";
import { primary } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useState } from "react";
import { useGetLoggedInUser } from "@/hooks/useGetLoggedInUser";

export default function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const router = useRouter();
  const { authUser } = useGetLoggedInUser();

  const signInUser = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email!,
      password: password!,
    });

    if (error) {
      Alert.alert(error.message);
      setEmail(undefined);
      setPassword(undefined);
    }
  };

  const disabled = !email || !password;

  if (authUser?.id) {
    return <Redirect href="/(tabs)/" />;
  }

  return (
    <View style={[defaultStyles.container, styles.container]}>
      <Text style={styles.h1}>Bandlink</Text>
      <TextInput
        value={email}
        autoCapitalize="none"
        placeholder="Email"
        style={defaultStyles.inputField}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        value={password}
        autoCapitalize="none"
        placeholder="Password"
        secureTextEntry={true}
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={[defaultStyles.btn, disabled && styles.disabledBtn]}
        onPress={signInUser}
        disabled={disabled}
      >
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

const styles = StyleSheet.create({
  disabledBtn: {
    opacity: 0.5,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  h1: {
    fontSize: 34,
    marginBottom: 10,
  },
});
