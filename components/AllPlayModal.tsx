import { FontAwesome } from "@expo/vector-icons";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Modal } from "react-native-paper";

type props = {
  playModalVisible: boolean;
  setPlayModalVisible: (a: boolean) => void;
  playersTable: number[];
  setPlayersTable: (a: any) => void;
  resetGame: () => void;
};
const AllPlayModal: FC<props> = ({
  playModalVisible,
  setPlayModalVisible,
  playersTable,
  resetGame,
}) => {
  return (
    <Modal
      visible={playModalVisible}
      style={{ margin: 50 }}
      onDismiss={() => setPlayModalVisible(false)}
    >
      <View style={styles.container}>
        <Text style={{ fontWeight: "900", color: "#888" }}>Players Table</Text>
        {playersTable.map((player, index) => (
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 50,
              width: "70%",
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
                color={"#bbb"}
              />
              <Text style={{ fontWeight: "900", fontSize: 16, color: "#444" }}>
                Player {index + 1}
              </Text>
            </View>
            <Text style={{ fontWeight: "900", fontSize: 20 }}>{player}</Text>
          </View>
        ))}
        <TouchableOpacity onPress={resetGame} style={styles.button}>
          <Text style={styles.buttonText}>Reset Game</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AllPlayModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 24,
    display: "flex",
    alignItems: "center",
    gap: 30,
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
