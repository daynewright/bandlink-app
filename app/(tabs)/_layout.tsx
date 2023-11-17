import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Events",
          tabBarLabel: "Events",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          headerTitle: "Store",
          tabBarLabel: "Store",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="(chat)/(topTabs)"
        options={{
          headerTitle: "Chat",
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
      {/* HIDDEN SCREENS FROM MAIN NAV */}
      <Tabs.Screen
        name="(chat)/direct/[id]"
        options={{
          headerTitle: "Direct Chat",
          href: null,
          headerLeft: () => (
            <Ionicons
              size={24}
              name="chevron-back"
              style={{ marginLeft: 10, fontWeight: "bold" }}
              onPress={() => router.push("/(tabs)/(chat)/(topTabs)/direct")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(chat)/group/[id]"
        options={{
          headerTitle: "Group Chat",
          href: null,
          headerLeft: () => (
            <Ionicons
              size={24}
              name="chevron-back"
              style={{ marginLeft: 10, fontWeight: "bold" }}
              onPress={() => router.push("/(tabs)/(chat)/(topTabs)/group")}
            />
          ),
        }}
      />
    </Tabs>
  );
}
