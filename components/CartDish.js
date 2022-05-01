import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useContext, useEffect } from "react";
import { BillContex, CartContex, CurrencyContex } from "../App";

const deviceWidth = Dimensions.get("window").width;
const cartDishHeight = 80;
const cartDishWidth = deviceWidth - 50;
export function CartDish({ name, price, image, id }) {
  const { colors } = useTheme();
  const [isdelete, setIsDelete] = useState(false);
  const [dishCount, setDishCount] = useState(1);
  const { cartData, setCartData } = useContext(CartContex);
  const currency = useContext(CurrencyContex);

  useEffect(() => {
    const index = cartData.findIndex((d) => d.id == id);
    const newCartData = [...cartData];
    newCartData[index] = { name, id, image, price, count: dishCount };
    setCartData(newCartData);
  }, [dishCount]);

  function handleDelete() {
    setIsDelete(true);
    const newCartArr = cartData.filter((dish) => dish.id != id);
    setCartData(newCartArr);
  }

  function changeDishCount(slug) {
    if (dishCount == 1 && slug == "minus") return;
    if (slug == "plus") setDishCount((p) => p + 1);
    else setDishCount((p) => p - 1);
  }

  return (
    <View style={[styles.container, { display: isdelete ? "none" : "flex" }]}>
      <View
        style={[
          styles.main_container,
          {
            borderColor: colors.cartDish.border,
            backgroundColor: colors.cartDish.background,
          },
        ]}
      >
        <Image source={{ uri: image || "" }} style={styles.dish_img} />
        <View style={styles.dish_info_container}>
          <Text style={[styles.text, { color: colors.text }]}>
            {name || "name"}
          </Text>
          <Text style={[styles.text, { color: colors.text }]}>
            {currency.sign} {price || "price"}
          </Text>
        </View>
        <View
          style={[styles.counter_container, { backgroundColor: colors.accent }]}
        >
          <TouchableOpacity
            onPress={() => changeDishCount("plus")}
            style={styles.counter_btn}
          >
            <AntDesign name="plus" size={12} color="black" />
          </TouchableOpacity>
          <Text style={styles.dish_count}>{dishCount}</Text>
          <TouchableOpacity
            onPress={() => changeDishCount("minus")}
            style={styles.counter_btn}
          >
            <AntDesign name="minus" size={12} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.delete_container, { backgroundColor: colors.accent }]}
        onPress={handleDelete}
      >
        <AntDesign name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  main_container: {
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    height: cartDishHeight,
    width: cartDishWidth - 40,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 15,
  },
  dish_img: {
    width: cartDishHeight,
    height: cartDishHeight,
  },
  dish_info_container: {
    height: cartDishHeight,
    alignItems: "flex-start",
    justifyContent: "space-around",
    paddingLeft: 10,
  },
  text: {
    color: "#000",
    fontSize: 16,
  },
  delete_container: {
    width: cartDishHeight / 1.7,
    height: cartDishHeight / 1.7,
    borderRadius: cartDishHeight / 6.5,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  counter_container: {
    backgroundColor: "green",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    right: 15,
    borderRadius: 20,
  },
  dish_count: {
    fontSize: 12,
  },
  counter_btn: {
    paddingHorizontal: 3,
    paddingVertical: 5,
  },
});
