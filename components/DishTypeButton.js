import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState } from "react";

export function DishTypeButton({ title }) {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick(title) {
    console.log(`${title} Clicked`);
    setIsClicked((p) => !p);
  }

  return (
    <TouchableOpacity
      onPress={() => handleClick(title)}
      style={[
        styles.dish_type_btn,
        { backgroundColor: isClicked ? "#000" : "#fff" },
      ]}
    >
      <Text
        style={[styles.dish_type_text, { color: isClicked ? "#FFF" : "#000" }]}
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
