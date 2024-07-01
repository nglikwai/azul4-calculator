import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "@/components/global/general";
import { FC } from "react";

import { StyleSheet } from "react-native";

type props = {
  resetCurrent: () => void;
  currentStep: number;
  nextPlayer: () => void;
};

const GameButtonGroup: FC<props> = ({
  resetCurrent,
  currentStep,
  nextPlayer,
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
      }}
    >
      <TouchableOpacity onPress={resetCurrent} style={styles.button}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
      {currentStep > 9 && (
        <>
          <TouchableOpacity
            onPress={nextPlayer}
            style={{ ...styles.button_cancel, backgroundColor: "#84cc16" }}
          >
            <Text style={styles.buttonText}>Next Player</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default GameButtonGroup;

const styles = StyleSheet.create({
  button_cancel: {
    backgroundColor: "red",
    paddingHorizontal: 24,
    paddingVertical: 15,
    borderRadius: 24,
    marginBottom: 16,
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
});
