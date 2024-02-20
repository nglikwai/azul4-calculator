import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { withExpoSnack } from "nativewind";
import { Text, View } from "@/components/global/general";
import PileWrapper from "@/components/PileWrapper";
import { useTile } from "./hook";

const TabOneScreen = () => {
  const {
    tileScore,
    continueBonus,
    handleOnPress,
    selected,
    selectAll,
    reset,
  } = useTile();

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.scoreWrapper}>
            <View style={styles.scoreContainer}>
              <Text style={styles.title}>Total Score</Text>
              <Text className="text-2xl font-black">
                {tileScore + continueBonus}
              </Text>
            </View>
            <View style={styles.subScoreContainer}>
              <View className="items-center">
                <Text>Tile Score</Text>
                <Text>{tileScore}</Text>
              </View>
              <View className="items-center">
                <Text>Continue Bouns</Text>
                <Text>{continueBonus}</Text>
              </View>
            </View>
          </View>

          <PileWrapper handleOnPress={handleOnPress} selected={selected} />

          <View className="flex flex-row justify-between w-full px-10">
            <View className="bg-yellow-400 rounded-xl mb-5">
              <TouchableOpacity onPress={selectAll}>
                <Text className="uppercase font-black text-white px-5 py-4">
                  select all
                </Text>
              </TouchableOpacity>
            </View>
            <View className="bg-blue-400 rounded-xl mb-5">
              <TouchableOpacity onPress={reset}>
                <Text className="uppercase font-black text-white px-10 py-4">
                  reset
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default withExpoSnack(TabOneScreen);

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scoreContainer: {
    display: "flex",
    alignItems: "center",
    padding: 10,
  },
  subScoreContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%",
  },
  tile: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scoreWrapper: {
    marginTop: 0,
    backgroundColor: "rgba(255,255,255,0.6)",
    padding: 20,
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  scrollView: {
    flexGrow: 1,
  },
});
