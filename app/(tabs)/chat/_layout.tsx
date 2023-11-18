import { TopTab } from "@/components/utils/TopTab";
import { primary } from "@/constants/Colors";

export default function TopTabLayout() {
  return (
    <TopTab
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: primary.orange },
      }}
    >
      <TopTab.Screen name="group" options={{ tabBarLabel: "Groups" }} />
      <TopTab.Screen name="direct" options={{ tabBarLabel: "Direct" }} />
    </TopTab>
  );
}
