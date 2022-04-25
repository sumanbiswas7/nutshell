import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState } from "react";

export function DishTypeButton({ title }) {
  const [activeBtn, setActiveBtn] = useState({
    active: null,
    items: ["Starter", "Main", "Desert", "Drink"],
  });

  function handleClick(title) {
    setActiveBtn({ ...activeBtn, active: title });
    if (activeBtn.active == title) {
      console.log(activeBtn);
    }
  }

  return (
    <TouchableOpacity
      onPress={() => handleClick(title)}
      style={[styles.dish_type_btn]}
    >
      <Text style={[styles.dish_type_text]}>{title}</Text>
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
