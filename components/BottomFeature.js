import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useTheme } from "@react-navigation/native";

const bottomFeatureSize = 140;
export function BottomFeature({ price }) {
  const [inCart, setInCart] = useState(true);
  const { colors } = useTheme();
  return (
    <View style={[styles.bottom_feature, { backgroundColor: colors.accent }]}>
      <Text style={styles.bottom_price}>₹ {price}</Text>
      <View style={styles.line} />
      <TouchableOpacity
        style={styles.addtocart_btn}
        onPress={() => setInCart((p) => !p)}
      >
        <Text style={styles.bottom_addToCart}>
          {inCart ? "Add to Cart" : "Remove "}
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
