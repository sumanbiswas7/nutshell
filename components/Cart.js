import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

export function Cart({ navigation, count }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.cart_container]}
      activeOpacity={0.5}
      onPress={() => navigation.navigate("cart")}
    >
      <AntDesign
        name="shoppingcart"
        size={20}
        color={"#fff"}
        style={{ marginRight: 2 }}
      />
      {count && count != 0 ? (
        <View
          style={[
            styles.cart_order_container,
            { backgroundColor: colors.cart.box },
          ]}
        >
          <Text style={[styles.cart_order_count, { color: colors.cart.count }]}>
            {count}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  cart_container: {
    backgroundColor: "#000",
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  cart_order_container: {
    position: "absolute",
    top: -5,
    left: -7,
    width: 18,
    height: 18,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cart_order_count: {
    color: "#FFF",
    fontSize: 12,
  },
});
