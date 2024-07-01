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
import FinalScoreModal from "@/components/FinalScoreModal";
import AllPlayModal from "@/components/AllPlayModal";
import PlayerScoreDisplay from "@/components/PlayerScoreDisplay";
import GameButtonGroup from "@/components/GameButtonGroup";
import MySnackbar from "@/components/Snackbar";

export const colors = [
  "#22d3ee",
  "#581c87",
  "#c084fc",
  "#eab308",
  "#84cc16",
  "#166534",
];

export default function EndGameCalculate() {
  const [visible, setVisible] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [scoreTable, setScoreTable] = useState<number[]>(Array(12).fill(0));
  const [finalScoreModalVisiblle, setFinalScoreModalVisiblle] = useState(false);

  const [playModalVisible, setPlayModalVisible] = useState(false);
  const [finalScore, setfinalScore] = useState("0");
  const [playersTable, setPlayersTable] = useState<number[]>([]);
  const [isReadyToNextPlayer, setIsReadyToNextPlayer] = useState(false);

  const {
    tileScore,
    continueBonus,
    handleOnPress,
    selected,
    setSelected,
    reset,
    set_selected,
  } = useTile();

  const total = tileScore + continueBonus;

  const totalScore = scoreTable.reduce((a, b) => a + b, 0) + +finalScore;

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

  const resetCurrent = () => {
    const newTable = [...scoreTable];
    newTable[currentStep - 1] = 0;
    setScoreTable(newTable);
    reset();
  };

  const resetAll = () => {
    setIsReadyToNextPlayer(false);
    setScoreTable(Array(12).fill(0));
    setCurrentStep(1);
    reset();
  };

  const addTypeScore = (n: number) => {
    setSelected(Array(n).fill(currentStep - 6));
    set_selected([Array(n).fill(currentStep - 6)]);
  };

  const nextPlayer = () => {
    if (!+finalScore) {
      setIsReadyToNextPlayer(true);
      setFinalScoreModalVisiblle(true);
      return;
    }
    setPlayersTable([...playersTable, totalScore]);
    resetAll();
    setfinalScore("0");
    setVisible(true);
  };

  const resetGame = () => {
    setPlayersTable([]);
    setPlayModalVisible(false);
    resetAll();
  };

  return (
    <View style={styles.container}>
      <PlayerScoreDisplay
        setPlayModalVisible={setPlayModalVisible}
        playersTable={playersTable}
        scoreTable={scoreTable}
        currentStep={currentStep}
        setFinalScoreModalVisiblle={setFinalScoreModalVisiblle}
        totalScore={totalScore}
        changeStep={changeStep}
      />
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
              style={{
                ...styles.numberButton,
                ...(selected.length === i
                  ? { border: "8px solid #fff", backgroundColor: "#eab308" }
                  : {}),
              }}
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

      <GameButtonGroup
        resetCurrent={resetCurrent}
        currentStep={currentStep}
        nextPlayer={nextPlayer}
      />
      <FinalScoreModal
        finalScoreModalVisiblle={finalScoreModalVisiblle}
        setFinalScoreModalVisiblle={setFinalScoreModalVisiblle}
        finalScore={finalScore}
        setfinalScore={setfinalScore}
        nextPlayer={nextPlayer}
        isReadyToNextPlayer={isReadyToNextPlayer}
      />
      <AllPlayModal
        playModalVisible={playModalVisible}
        setPlayModalVisible={setPlayModalVisible}
        playersTable={playersTable}
        setPlayersTable={setPlayersTable}
        resetGame={resetGame}
      />
      <MySnackbar visible={visible} setVisible={setVisible} />
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
  button: {
    backgroundColor: "#22d3ee",
    paddingHorizontal: 24,
    paddingVertical: 15,
    borderRadius: 24,
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
    height: "60%",
    columnGap: 40,
    justifyContent: "center",
    marginTop: 20,
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
    backgroundColor: "#eab308cc",
    borderRadius: 50,
  },
});
