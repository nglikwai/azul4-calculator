import { StyleSheet } from "react-native";
import { View, Text } from "@/components/global/general";

export default function TabThreeScreen() {
  return (
    <View style={styles.container} className="">
      <View className="w-full py-10" style={styles.info}>
        <Text className="text-lg pb-10">Version: beta 1.1</Text>
        <Text className="text-lg">Developed by LIK WAI</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  info: {
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 40,
  },
});
