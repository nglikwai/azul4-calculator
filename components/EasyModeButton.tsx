import { Text, View } from "@/components/Themed";
import { useState } from "react";
import { Switch } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useApp } from "@/context";
import { AppActionType } from "@/reducer";

const EasyModeButton = () => {
  const { appState, dispatch } = useApp();
  const { easyMode } = appState;
  return (
    <View style={styles.switchContainer}>
      <Text>{easyMode ? "Easy" : "Hard"}</Text>
      <Switch
        value={easyMode}
        color="#fff"
        onValueChange={() =>
          dispatch({ type: AppActionType.SET_EASY_MODE, payload: !easyMode })
        }
      />
    </View>
  );
};

export default EasyModeButton;

const styles = StyleSheet.create({
  switchContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
