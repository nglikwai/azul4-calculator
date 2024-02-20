import { ReactNode } from "react";
import { ImageBackground } from "react-native";
import { StyleSheet } from "react-native";

const BackgroundImage = ({ children }: { children: ReactNode }) => {
  return (
    <ImageBackground
      source={require("@/assets/images/bg.png")}
      style={styles.background}
      blurRadius={10}
    >
      {children}
    </ImageBackground>
  );
};

export default BackgroundImage;

const styles = StyleSheet.create({
  background: {
    resizeMode: "cover", // or 'stretch' or 'contain'
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});
