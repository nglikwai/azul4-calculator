import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import EasyModeButton from "@/components/EasyModeButton";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Calculator",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calculator" color={color} />
          ),
          headerRight: () => <EasyModeButton />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "End Game",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="gamepad" color={color} />
          ),
          headerRight: () => <EasyModeButton />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: "About",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
    </Tabs>
  );
}
