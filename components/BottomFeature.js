import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useContext } from "react";
import { useTheme } from "@react-navigation/native";
import { CartContex, CurrencyContex } from "../App";

const bottomFeatureSize = 140;
export function BottomFeature({
  price,
  isInCart,
  dish,
  setIsInCart,
  setAdded,
}) {
  const { colors } = useTheme();
  const { cartData, setCartData } = useContext(CartContex);
  const currency = useContext(CurrencyContex);

  function handleAddToCart() {
    setIsInCart((p) => !p);
    setAdded((p) => !p);
    if (isInCart) {
      const newCartData = cartData.filter((d) => d.id != dish.id);
      setCartData(newCartData);
    } else {
      const newCartData = [...cartData, dish];
      setCartData(newCartData);
    }
  }

  return (
    <View style={[styles.bottom_feature, { backgroundColor: colors.accent }]}>
      <Text style={styles.bottom_price}>
        {currency.sign} {price}
      </Text>
      <View style={styles.line} />
      <TouchableOpacity style={styles.addtocart_btn} onPress={handleAddToCart}>
        <Text style={styles.bottom_addToCart}>
          {!isInCart ? "Add to Cart" : "Remove "}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  bottom_feature: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: bottomFeatureSize / 2.5,
    borderRadius: 40,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  line: {
    width: 1,
    height: bottomFeatureSize / 4,
    backgroundColor: "#000",
  },
  bottom_price: {
    width: bottomFeatureSize,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: bottomFeatureSize / 8,
  },
  bottom_addToCart: {
    width: bottomFeatureSize,
    textAlign: "center",
    fontSize: bottomFeatureSize / 10,
    fontWeight: "bold",
  },
  addtocart_btn: {
    height: "100%",
    justifyContent: "center",
  },
});
