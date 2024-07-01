import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { withExpoSnack } from "nativewind";
import { Text, View } from "react-native";
import PileWrapper from "@/components/PileWrapper";
import { useTile } from "@/hook";
import EasyModeButton from "@/components/EasyModeButton";
import { colors } from "./two";
import { useApp } from "@/context";

const TabOneScreen = () => {
  const {
    tileScore,
    continueBonus,
    handleOnPress,
    selected,
    selectAll,
    reset,
  } = useTile();

  const { appState } = useApp();

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.scoreWrapper}>
            <View style={styles.scoreText}>
              <Text style={{ color: colors[5], fontWeight: "900" }}>TILE</Text>
              <Text style={{ color: colors[5], fontWeight: "900" }}>
                {tileScore}
              </Text>
            </View>

            <EasyModeButton
              score={tileScore + continueBonus}
              bg={appState.easyMode ? "#84cc16" : "#166534"}
            />

            <View style={styles.scoreText}>
              <Text style={{ color: colors[0], fontWeight: "900" }}>BOUNS</Text>
              <Text style={{ color: colors[0], fontWeight: "900" }}>
                {continueBonus}
              </Text>
            </View>
          </View>

          <PileWrapper handleOnPress={handleOnPress} selected={selected} />

          <View style={styles.buttonContainer}>
            <View style={{ ...styles.button, backgroundColor: "#84cc16" }}>
              <TouchableOpacity onPress={selectAll}>
                <Text style={styles.buttonText}>select all</Text>
              </TouchableOpacity>
            </View>
            <View style={{ ...styles.button, backgroundColor: "#22d3ee" }}>
              <TouchableOpacity onPress={reset}>
                <Text style={styles.buttonText}>reset</Text>
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

  subScoreContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50%",
  },
  scoreText: {
    alignItems: "center",
    opacity: 0.7,
  },
  tile: {
    fontSize: 20,
  },
  scoreWrapper: {
    marginTop: 0,
    paddingTop: 24,
    backgroundColor: "rgba(255,255,255,0.6)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 24,
  },
  scrollView: {
    flexGrow: 1,
  },
  buttonText: {
    padding: 10,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    textTransform: "uppercase",
  },
  button: {
    borderRadius: 24,
    padding: 4,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 250,
    marginBottom: 20,
  },
});
