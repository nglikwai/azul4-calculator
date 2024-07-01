import { colors } from "@/app/(tabs)/two";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "@/components/global/general";
import EasyModeButton from "./EasyModeButton";
import { pileImages } from "./PileWrapper";
import { FC } from "react";
import { StyleSheet } from "react-native";

type props = {
  setPlayModalVisible: (val: boolean) => void;
  playersTable: number[];
  scoreTable: number[];
  currentStep: number;
  setFinalScoreModalVisiblle: (val: boolean) => void;
  totalScore: number;
  changeStep: (n: number) => void;
};
const PlayerScoreDisplay: FC<props> = ({
  setPlayModalVisible,
  playersTable,
  scoreTable,
  currentStep,
  setFinalScoreModalVisiblle,
  totalScore,
  changeStep,
}) => {
  return (
    <View style={styles.scoreWrapper}>
      <View style={styles.scoreContainer}>
        <TouchableOpacity
          onPress={() => setPlayModalVisible(true)}
          style={{
            flexDirection: "row",
            position: "absolute",
            left: 0,
            backgroundColor: "#84cc16",
            borderRadius: 24,
            padding: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <FontAwesome
              size={20}
              style={{ marginBottom: -3 }}
              name="user"
              color={"#fff"}
            />
            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20 }}>
              {playersTable.length}
            </Text>
          </View>
        </TouchableOpacity>
        <EasyModeButton
          score={scoreTable[currentStep - 1]}
          bg={currentStep <= 6 ? colors[currentStep - 1] : "#eab308"}
        />

        <TouchableOpacity
          onPress={() => setFinalScoreModalVisiblle(true)}
          style={{
            flexDirection: "row",
            position: "absolute",
            right: 0,
            backgroundColor: "#84cc16",
            borderRadius: 24,
            padding: 10,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>total</Text>
          <Text style={{ marginLeft: 4, color: "#fff", fontWeight: "900" }}>
            {totalScore}
          </Text>
        </TouchableOpacity>
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
                  borderRadius: 24,
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
  );
};

export default PlayerScoreDisplay;

const styles = StyleSheet.create({
  scoreWrapper: {
    marginTop: 0,
    backgroundColor: "rgba(255,255,255,0.6)",
    padding: 20,
    width: "100%",
    display: "flex",
    alignItems: "center",
    borderRadius: 24,
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
});
