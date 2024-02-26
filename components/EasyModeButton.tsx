import { Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { useApp } from "@/context";
import { AppActionType } from "@/reducer";
import { FC } from "react";

type props = {
  score: number;
  bg: string;
};
const EasyModeButton: FC<props> = ({ score, bg }) => {
  const { appState, dispatch } = useApp();
  const { easyMode } = appState;
  return (
    <TouchableOpacity
      style={{ backgroundColor: bg, ...styles.scoreContainer }}
      onPress={() =>
        dispatch({ type: AppActionType.SET_EASY_MODE, payload: !easyMode })
      }
    >
      <Text style={styles.totalScoreText}>{score}</Text>
      <Text style={{ color: "#fff", fontWeight: "700" }}>
        {easyMode ? "Easy" : "Hard"}
      </Text>
    </TouchableOpacity>
  );
};

export default EasyModeButton;

const styles = StyleSheet.create({
  scoreContainer: {
    fontWeight: "700",
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  totalScoreText: {
    fontSize: 40,
    fontWeight: "700",
    color: "#fff",
    paddingHorizontal: 10,
  },
});
