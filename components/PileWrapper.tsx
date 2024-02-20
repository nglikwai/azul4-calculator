import { Text, View } from "@/components/global/general";
import { FC } from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";

export const pileImages = [
  require("@/assets/images/1.png"),
  require("@/assets/images/2.png"),
  require("@/assets/images/3.png"),
  require("@/assets/images/4.png"),
  require("@/assets/images/5.png"),
  require("@/assets/images/6.png"),
];

type props = {
  handleOnPress: (n: number) => void;
  selected: number[];
};

const PileWrapper: FC<props> = ({ handleOnPress, selected }) => {
  return (
    <View style={styles.buttonContainer}>
      {pileImages.map((image, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => handleOnPress(i + 1)}
          style={styles.button}
        >
          <Image
            style={{
              ...styles.pileImage,
              ...(selected.includes(i + 1) ? styles.selectedButton : {}),
            }}
            source={image}
          />

          {selected.filter((s) => s === i + 1).length > 1 && (
            <View style={styles.count}>
              <Text style={styles.countText}>
                {selected.filter((s) => s === i + 1).length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PileWrapper;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "flex-start",
    marginTop: 50,
    gap: 20,
  },
  button: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    width: "40%",
  },
  selectedButton: {
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 10,
  },
  pileImage: {
    width: "80%",
    height: 120,
    resizeMode: "contain",
  },
  count: {
    width: 30,
    height: 30,
    backgroundColor: "#cccc55",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#999900",
  },
  countText: {
    fontWeight: "bold",
    textAlign: "right",
  },
});
