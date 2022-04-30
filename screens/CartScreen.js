import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { CartContex } from "../App";
import { CartDish } from "../components/CartDish";
import { useTheme } from "@react-navigation/native";
import { EmptyData } from "../components/EmptyData";
import ImageAutoHeight from "react-native-image-auto-height";

const footerContainerHeight = 150;
const deviceWidth = Dimensions.get("window").width;
const faltListHeight = Dimensions.get("window").height - footerContainerHeight;
export default function CartScreen({ navigation }) {
  const { cartData } = useContext(CartContex);
  const [totalBill, setTotalBill] = useState(0);
  const { colors } = useTheme();

  useEffect(() => {
    setBill();
    function setBill() {
      let tempBill = 0;
      cartData.forEach((d) => {
        if (d.count) tempBill += d.price * d.count;
        else tempBill += d.price;
      });
      setTotalBill(tempBill);
    }
  }, [cartData]);

  if (cartData.length == 0)
    return (
      <EmptyData text="Cart is empty">
        <ImageAutoHeight
          source={require("../assets/images/empty_cart.png")}
          style={styles.empty_img}
        />
      </EmptyData>
    );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={cartData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <CartDish
              name={item.name}
              price={item.price}
              image={item.image}
              id={item.id}
            />
          );
        }}
      />
      <View style={[styles.footer_container]}>
        <View style={styles.total_line} />
        <View style={styles.total_text_container}>
          <Text style={styles.total_text}>Total</Text>
          <Text style={styles.total_text}>{totalBill}/-</Text>
        </View>
        <TouchableOpacity
          style={[styles.checkout_btn, { backgroundColor: colors.accent }]}
        >
          <Text>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flexGrow: 0,
    height: faltListHeight,
  },
  footer_container: {
    height: footerContainerHeight,
    width: deviceWidth,
    alignItems: "center",
  },
  total_line: {
    width: deviceWidth - 50,
    height: 1,
    backgroundColor: "#000",
    marginTop: 20,
  },
  total_text_container: {
    marginTop: 10,
    width: deviceWidth - 100,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  total_text: {
    fontSize: 19,
  },
  checkout_btn: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  empty_img: {
    width: 150,
    height: "auto",
  },
});
