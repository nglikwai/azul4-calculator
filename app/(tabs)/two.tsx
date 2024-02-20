import { StyleSheet } from "react-native";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "@/components/global/general";
import PileWrapper, { pileImages } from "@/components/PileWrapper";
import { useTile } from "./hook";
import { useEffect, useState } from "react";

export default function EndGameCalculate() {
  const [currentStep, setCurrentStep] = useState(1);
  const [scoreTable, setScoreTable] = useState<number[]>(Array(12).fill(0));

  const {
    tileScore,
    continueBonus,
    handleOnPress,
    selected,
    selectAll,
    setSelected,
    reset,
  } = useTile();

  const total = tileScore + continueBonus;

  useEffect(() => {
    setScoreTable((prev: number[]) => {
      const newScoreTable = [...prev];
      newScoreTable[currentStep - 1] = total;
      return newScoreTable;
    });
  }, [total]);

  const changeStep = (n: number) => {
    setCurrentStep(n);
    reset();
  };

  const resetAll = () => {
    setScoreTable(Array(12).fill(0));
    setCurrentStep(1);
    reset();
  };

  const addTypeScore = (n: number) => {
    setSelected(Array(n).fill(currentStep - 6));
  };

  return (
    <View style={styles.container} className="">
      <View style={styles.scoreWrapper}>
        <View style={styles.scoreContainer}>
          <Text style={styles.title}>Total Score</Text>
          <Text className="text-2xl font-black">
            {scoreTable.reduce((a, b) => a + b, 0)}
          </Text>
        </View>
        <View style={styles.subScoreContainer}>
          {["blue", "green", "cyan", "yellow", "purple", "orange"].map(
            (color, i) => (
              <View key={color} className="flex items-center gap-1">
                <TouchableOpacity
                  onPress={() => changeStep(i + 1)}
                  className={`${
                    currentStep == i + 1
                      ? `py-2 scale-150 bg-${color}-300 w-4 h-4 rounded`
                      : `bg-${color}-300 w-4 h-4 rounded`
                  } `}
                />
                <Text className="text-xs">{scoreTable[i]}</Text>
              </View>
            )
          )}
          {pileImages.map((type, i) => (
            <View key={i} className="flex items-center gap-1">
              <TouchableOpacity
                onPress={() => changeStep(i + 7)}
                className={currentStep == i + 7 ? "py-2 scale-150" : ""}
              >
                <Image source={type} className="w-6 h-6" />
              </TouchableOpacity>
              <Text className="text-xs">{scoreTable[i + 6]}</Text>
            </View>
          ))}
        </View>
      </View>
      {currentStep < 7 ? (
        <PileWrapper handleOnPress={handleOnPress} selected={selected} />
      ) : (
        <View className="flex flex-wrap flex-row gap-6 m-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <TouchableOpacity
              onPress={() => addTypeScore(i)}
              className="w-2/5 h-20 bg-yellow-400 opacity-95 rounded-3xl flex items-center justify-center mb-4"
            >
              <Text key={i} className="text-3xl text-white font-black">
                {i}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity
        onPress={resetAll}
        className="bg-blue-400 px-6 py-4 rounded-xl mb-4"
      >
        <Text className="text-white uppercase font-black">Reset</Text>
      </TouchableOpacity>
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
  scoreWrapper: {
    marginTop: 0,
    backgroundColor: "rgba(255,255,255,0.6)",
    padding: 20,
    width: "100%",
    display: "flex",
    alignItems: "center",
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
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
