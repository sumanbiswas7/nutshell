import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

export function DishTypeButton({ title, slug, onPress, id, active }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => onPress(slug, id)}
      style={[
        styles.dish_type_btn,
        {
          backgroundColor: active
            ? colors.dishType.active
            : colors.dishType.inactive,
        },
      ]}
    >
      <Text
        style={[styles.dish_type_text, { color: active ? "#FFF" : "#000" }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  dish_type_btn: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    height: 35,
    // width: 70,
    paddingHorizontal: 15,
    borderRadius: 30,
    borderColor: "#000",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dish_type_text: {
    fontWeight: "300",
  },
});
