import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;
export function SearchBox() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search dish"
        placeholderTextColor={"rgba(0,0,0,0.4)"}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: deviceWidth - 40,
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomColor: "rgba(0,0,0,0.4)",
    borderBottomWidth: 1,
    fontSize: 17,
  },
});
