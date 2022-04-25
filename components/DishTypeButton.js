import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState } from "react";

export function DishTypeButton({ title, onPress, id, active }) {
  return (
    <TouchableOpacity
      onPress={() => onPress(title, id)}
      style={[
        styles.dish_type_btn,
        { backgroundColor: active ? "#000" : "#FFF" },
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
    width: 70,
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
