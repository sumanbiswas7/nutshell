import { StyleSheet, Text, View, StatusBar } from "react-native";
import { useContext, useEffect } from "react";
import { CartContex } from "../App";

const headerMarginTop = StatusBar.currentHeight;
export default function CartScreen({ navigation }) {
  const { cartData } = useContext(CartContex);

  useEffect(() => {
    console.log(cartData);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
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
