import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const deviceWidth = Dimensions.get("window").width;
const searchBoxWidth = deviceWidth - 80;
const searchBoxHeight = 42;

export function SearchBox({ searchInput }) {
  const { colors } = useTheme();
  function handleTextChange(text) {
    searchInput(text);
  }
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.searchBarBackground },
      ]}
    >
      <TextInput
        style={styles.search_input}
        placeholder="Search dish"
        placeholderTextColor={"rgba(0,0,0,0.4)"}
        autoFocus
        onChangeText={handleTextChange}
      />
      <TouchableOpacity activeOpacity={0.5} style={[styles.search_btn]}>
        <AntDesign
          name="search1"
          size={searchBoxHeight / 2}
          color={colors.accent}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  search_input: {
    width: searchBoxWidth,
    height: searchBoxHeight,
    paddingLeft: searchBoxHeight / 3,
    fontSize: searchBoxHeight / 2.7,
  },
  search_btn: {
    height: searchBoxHeight,
    width: searchBoxHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});
