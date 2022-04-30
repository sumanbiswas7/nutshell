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

const footerContainerHeight = 200;
const deviceWidth = Dimensions.get("window").width;
const faltListHeight = Dimensions.get("window").height - footerContainerHeight;
export default function CartScreen({ navigation }) {
  const { cartData } = useContext(CartContex);
  const [totalBill, setTotalBill] = useState(0);

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
        <Text>{totalBill}</Text>
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
    backgroundColor: "green",
    height: footerContainerHeight,
    width: deviceWidth,
    justifyContent: "center",
    alignItems: "center",
  },
});
