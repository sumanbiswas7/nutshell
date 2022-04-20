import { StyleSheet, View, Text, StatusBar } from "react-native";

const headerMarginTop = StatusBar.currentHeight;
export default function FavouriteScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourite</Text>
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
