import { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Snackbar } from "react-native-paper";

type props = {
  visible: boolean;
  setVisible: (a: boolean) => void;
};
const MySnackbar: React.FC<props> = ({ visible, setVisible }) => {
  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={styles.snackbar}
        duration={2000}
      >
        <Text style={styles.text}>NEXT PLAYER!</Text>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: 50,
    width: "80%",
    top: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  snackbar: {
    backgroundColor: "#84cc16ee",
    borderRadius: 24,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    display: "flex",
    justifyContent: "center",
  },
});

export default MySnackbar;
