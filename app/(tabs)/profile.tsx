import { StyleSheet } from "react-native";

import { Text, View } from "@/components/utils/Themed";

import { useGetBandById } from "@/hooks/api";

export default function Profile() {
  // const { data, error } = useGetBands();
  const { data, error } = useGetBandById(
    "9bebd8a9-1354-459a-81a8-45dd9150e665"
  );

  // const { data, error } = useGetGroupById(
  //   "9ed61ea1-a7d3-47fa-808a-25162973e3df"
  // );

  // const { data, error } = useGetGroupsByBandId(
  //   "9bebd8a9-1354-459a-81a8-45dd9150e665"
  // );

  // const { data, error } = useGetLoggedInProfile();

  console.log(JSON.stringify(data, null, 2));
  console.log(JSON.stringify(error, null, 2));

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Text>{data?.description}</Text>

      <Text>{JSON.stringify({ data }, null, 2)}</Text>
      <Text>{JSON.stringify({ error }, null, 2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
