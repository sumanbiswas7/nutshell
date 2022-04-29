import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  Dimensions,
} from "react-native";
import { useContext, useEffect } from "react";
import { CartContex } from "../App";
import { CartDish } from "../components/CartDish";

const headerMarginTop = StatusBar.currentHeight;
const footerContainerHeight = 300;
const deviceWidth = Dimensions.get("window").width;
const faltListHeight = Dimensions.get("window").height - footerContainerHeight;
export default function CartScreen({ navigation }) {
  const { cartData } = useContext(CartContex);

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
      <View style={styles.footer_container}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  flatList: {
    flexGrow: 0,
    height: faltListHeight,
  },
  footer_container: {
    backgroundColor: "green",
    height: footerContainerHeight,
    width: deviceWidth,
  },
});
