import { StyleSheet } from "react-native";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "@/components/global/general";
import PileWrapper, { pileImages } from "@/components/PileWrapper";
import { useTile } from "@/hook";
import { useEffect, useState } from "react";
import EasyModeButton from "@/components/EasyModeButton";

export const colors = [
  "#22d3ee",
  "#581c87",
  "#c084fc",
  "#eab308",
  "#84cc16",
  "#166534",
];

export default function EndGameCalculate() {
  const [currentStep, setCurrentStep] = useState(1);
  const [scoreTable, setScoreTable] = useState<number[]>(Array(12).fill(0));

  const {
    tileScore,
    continueBonus,
    handleOnPress,
    selected,
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
    <View style={styles.container}>
      <View style={styles.scoreWrapper}>
        <View style={styles.scoreContainer}>
          <EasyModeButton
            score={scoreTable[currentStep - 1]}
            bg={currentStep <= 6 ? colors[currentStep - 1] : "#eab308"}
          />

          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              right: 0,
              backgroundColor: "#84cc16",
              borderRadius: 20,
              padding: 10,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700" }}>total</Text>
            <Text style={{ marginLeft: 4, color: "#fff", fontWeight: "900" }}>
              {scoreTable.reduce((a, b) => a + b, 0)}
            </Text>
          </View>
        </View>
        <View style={styles.subScoreContainer}>
          {colors.map((color, i) => (
            <TouchableOpacity
              key={color}
              style={{ display: "flex", alignItems: "center", gap: 4 }}
              onPress={() => changeStep(i + 1)}
            >
              {scoreTable[i] > 0 ? (
                <Text style={{ color, fontWeight: "700", fontSize: 20 }}>
                  {scoreTable[i]}
                </Text>
              ) : (
                <View
                  style={{
                    backgroundColor: color,
                    width: 24,
                    height: 24,
                    borderRadius: 20,
                  }}
                />
              )}
            </TouchableOpacity>
          ))}
          {pileImages.map((type, i) => (
            <View key={i} style={{ alignItems: "center", gap: 4 }}>
              <TouchableOpacity
                onPress={() => changeStep(i + 7)}
                className={currentStep == i + 7 ? "py-2 scale-150" : ""}
                style={{ paddingVertical: 8 }}
              >
                {scoreTable[i + 6] > 0 ? (
                  <Text
                    style={{
                      color: "#eab308",
                      fontWeight: "700",
                      fontSize: 20,
                    }}
                  >
                    {scoreTable[i + 6]}
                  </Text>
                ) : (
                  <Image source={type} style={{ width: 24, height: 24 }} />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      {currentStep < 7 ? (
        <PileWrapper
          handleOnPress={handleOnPress}
          selected={selected}
          gameMode={true}
        />
      ) : (
        <View style={styles.buttonPad}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <TouchableOpacity
              onPress={() => addTypeScore(i)}
              style={styles.numberButton}
              key={i}
            >
              <Text key={i} style={styles.numberText}>
                {i}
              </Text>
              <Image
                source={pileImages[currentStep - 7]}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity onPress={resetAll} style={styles.button}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
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
    justifyContent: "center",
    padding: 10,
    flexDirection: "row",
    width: "100%",
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
  totalScore: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "700",
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 50,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#22d3ee",
    paddingHorizontal: 24,
    paddingVertical: 15,
    borderRadius: 20,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "700",
  },
  buttonPad: {
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%",
    gap: 50,
    justifyContent: "center",
  },
  numberText: {
    fontWeight: "900",
    color: "#fff",
    fontSize: 50,
    marginRight: 20,
  },
  numberButton: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    width: "40%",
    height: 110,
    backgroundColor: "#eab308ee",
    borderRadius: 50,
  },
  totalScoreText: {
    fontSize: 40,
    fontWeight: "700",
    color: "#fff",
    paddingHorizontal: 10,
  },
});
