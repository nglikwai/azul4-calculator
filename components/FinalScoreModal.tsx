import { Modal } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { FC, useState } from "react";
import { TouchableOpacity } from "./global/general";

type props = {
  finalScoreModalVisiblle: boolean;
  setFinalScoreModalVisiblle: (a: boolean) => void;
  finalScore: string;
  setfinalScore: (a: string) => void;
  nextPlayer: () => void;
  isReadyToNextPlayer: boolean;
};
const FinalScoreModal: FC<props> = ({
  finalScoreModalVisiblle,
  setFinalScoreModalVisiblle,
  finalScore,
  setfinalScore,
  nextPlayer,
  isReadyToNextPlayer,
}) => {
  const onOk = () => {
    setFinalScoreModalVisiblle(false);
    if (isReadyToNextPlayer) nextPlayer();
  };

  const setScore = (n: number) => {
    if (+finalScore > 999) return;
    setfinalScore((+(finalScore + n)).toString());
  };
  return (
    <Modal
      visible={finalScoreModalVisiblle}
      style={{ margin: 20 }}
      dismissable={true}
      onDismiss={() => setFinalScoreModalVisiblle(false)}
    >
      <View style={styles.container}>
        <Text style={{ fontWeight: "900", fontSize: 20, color: "#999" }}>
          Current Score
        </Text>
        <Text style={{ fontWeight: "900", fontSize: 40, color: "#444" }}>
          {finalScore}
        </Text>
        <View style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <View style={styles.numberPadContainer}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <TouchableOpacity
                key={n}
                style={styles.numberButton}
                onPress={() => setScore(n)}
              >
                <Text style={styles.numberButtonText}>{n}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={{ ...styles.numberButton }}
              onPress={() => setfinalScore("0")}
            >
              <Text style={styles.numberButtonText}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.numberButton }}
              onPress={() => setScore(0)}
            >
              <Text style={styles.numberButtonText}>0</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ ...styles.numberButton, backgroundColor: "#22d3ee" }}
              onPress={onOk}
            >
              <Text style={{ ...styles.numberButtonText }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FinalScoreModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 24,
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  numberPadContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    columnGap: 14,
    rowGap: 10,
    width: "100%",
    marginVertical: 20,
  },
  numberButton: {
    width: "30%",
    backgroundColor: "#84cc16",
    height: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  numberButtonText: {
    fontSize: 30,
    fontWeight: "900",
    color: "#fff",
  },
});
