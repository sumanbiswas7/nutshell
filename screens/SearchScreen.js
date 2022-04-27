import { View, Text, StyleSheet } from "react-native";
import { SearchBox } from "../components/SearchBox";
export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <SearchBox />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
