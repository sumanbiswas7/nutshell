import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { BottomFeature } from "../components/BottomFeature";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useContext, useState } from "react";
import { CartContex } from "../App";

const deviceWidth = Dimensions.get("window").width;
const headerMarginTop = StatusBar.currentHeight;
const favBoxSize = 35;
export function SingleDishScreen({ navigation, route }) {
  const DISH = route.params.dish;
  const setAdded = route.params.setAdded;
  const { colors } = useTheme();
  const { cartData } = useContext(CartContex);
  const [isFav, setIsFav] = useState(false);
  const [dish, setDish] = useState(DISH);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    cartData.map((d) => {
      if (d.id == dish.id) {
        setIsInCart(true);
      }
    });
  }, []);

  function handleFavClick() {
    setIsFav((p) => !p);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.accent }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.dish_image_container}>
        <Image
          style={styles.dish_image}
          source={{ uri: dish.image }}
          resizeMode={"cover"}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.6)"]}
          style={styles.overlay}
        />
        <TouchableOpacity
          style={[styles.fav_box, { backgroundColor: colors.accent }]}
          activeOpacity={0.7}
          onPress={handleFavClick}
        >
          {isFav ? (
            <AntDesign name="star" size={favBoxSize / 2} color="black" />
          ) : (
            <AntDesign name="staro" size={favBoxSize / 2} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.dish_name}>{dish.name}</Text>
      <Text style={styles.dish_description}>{dish.description}</Text>
      <BottomFeature
        price={dish.price}
        isInCart={isInCart}
        dish={dish}
        setIsInCart={setIsInCart}
        setAdded={setAdded}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: headerMarginTop,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: deviceWidth,
    paddingHorizontal: 20,
    position: "absolute",
    top: 0,
    height: 60,
  },
  dish_image_container: {
    position: "absolute",
    top: 60,
  },
  dish_image: {
    width: deviceWidth,
    height: 300,
  },
  overlay: {
    height: 80,
    width: deviceWidth,
    position: "absolute",
    bottom: 0,
  },
  dish_name: {
    width: deviceWidth,
    paddingHorizontal: 20,
    fontSize: 25,
    // marginTop: 50,
    marginBottom: 10,
    top: 360 + 30,
    position: "absolute",
  },
  dish_description: {
    width: deviceWidth,
    paddingHorizontal: 20,
    fontSize: 17,
    color: "#595959",
    top: 360 + 70,
    position: "absolute",
  },
  fav_box: {
    width: favBoxSize,
    height: favBoxSize,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: favBoxSize / 2,
    position: "absolute",
    bottom: -favBoxSize / 2,
    right: 30,
  },
});