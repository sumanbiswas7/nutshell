import { View, Text, StyleSheet, Image } from "react-native";
import ImageAutoHeight from "react-native-image-auto-height";
export function HeaderLogo() {
  return (
    <View style={styles.container}>
      <ImageAutoHeight
        style={styles.logo}
        source={require("../assets/logo.png")}
      />
      <Text style={styles.logo_text}>nutshell</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  logo: {
    width: 25,
    height: "auto",
  },
  logo_text: {
    fontSize: 35,
    marginLeft: 8,
    fontFamily: "font-1",
  },
});
