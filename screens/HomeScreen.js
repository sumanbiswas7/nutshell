import { StatusBar } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { Cart } from "../components/Cart";

const headerMarginTop = StatusBar.currentHeight;
export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Cart navigation={navigation} />
      <Text style={styles.title}>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: headerMarginTop,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
