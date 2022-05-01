import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { BottomFeature } from "../components/BottomFeature";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useContext, useState } from "react";
import { CartContex, CurrencyContex, FavouriteContex } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

const deviceWidth = Dimensions.get("window").width;
const favBoxSize = 35;
export function SingleDishScreen({ navigation, route }) {
  const DISH = route.params.dish;
  const setAdded = route.params.setAdded;
  const { colors } = useTheme();
  const { cartData } = useContext(CartContex);
  const { favouriteData, setFavouriteData } = useContext(FavouriteContex);
  const [isFav, setIsFav] = useState(false);
  const [dish, setDish] = useState(DISH);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    cartData.map((d) => {
      if (d.id == dish.id) {
        setIsInCart(true);
      }
    });
    favouriteData.map((d) => {
      if (d.id == dish.id) {
        setIsFav(true);
      }
    });
  }, []);

  async function handleFavClick() {
    setIsFav((p) => !p);
    if (!isFav) {
      const addInFavArr = [...favouriteData, dish];
      setFavouriteData(addInFavArr);

      const storageObj = {};
      addInFavArr.forEach((d) => (storageObj[d.id] = true));

      try {
        const jsonValue = JSON.stringify(storageObj);
        await AsyncStorage.setItem("favourites", jsonValue);
      } catch (e) {
        console.log(`Setting Local Storage Err - ${e}`);
      }
    } else {
      const removeFromFavArr = favouriteData.filter((d) => d.id != dish.id);
      setFavouriteData(removeFromFavArr);

      const storageObj = {};
      removeFromFavArr.forEach((d) => (storageObj[d.id] = true));
      try {
        const jsonValue = JSON.stringify(storageObj);
        await AsyncStorage.setItem("favourites", jsonValue);
      } catch (e) {
        console.log(`Setting Local Storage Err - ${e}`);
      }
    }
  }

  return (
    <View style={styles.container}>
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
      <View style={styles.info_container}>
        <Text style={[styles.dish_name, { color: colors.dish.title }]}>
          {dish.name}
        </Text>
        <Text
          style={[styles.dish_description, { color: colors.dish.description }]}
        >
          {dish.description}
        </Text>
      </View>
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
  },
  dish_image_container: {
    position: "absolute",
    top: 0,
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
  info_container: {
    position: "absolute",
    top: 330,
  },
  dish_name: {
    width: deviceWidth,
    paddingHorizontal: 20,
    fontSize: 25,
    marginBottom: 10,
  },
  dish_description: {
    width: deviceWidth,
    paddingHorizontal: 20,
    fontSize: 17,
    color: "#595959",
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
