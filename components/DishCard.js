import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { CartContex, CurrencyContex } from "../App";

const cardSize = 150;
const blankImage =
  "https://sumanbiswas-website.s3.ap-south-1.amazonaws.com/nutshell-image-temp/blank.png";
export function DishCard({
  title,
  description,
  image,
  price,
  navigation,
  id,
  dish,
}) {
  const { colors } = useTheme();
  const { cartData, setCartData } = useContext(CartContex);
  const currency = useContext(CurrencyContex);
  const [added, setAdded] = useState(false);
  const [dishTitle, setDishtitle] = useState("");
  const [dishDescription, setDishDescription] = useState("");

  useEffect(() => {
    trimText();
    function trimText() {
      if (title.length > 15) {
        setDishtitle(`${title.slice(0, 15)}...`);
      } else {
        setDishtitle(title);
      }
      if (description.length > 15) {
        setDishDescription(`${description.slice(0, 15)}...`);
      } else {
        setDishDescription(description);
      }
    }
  }, []);
  useEffect(() => {
    setFirstAdded();
    function setFirstAdded() {
      cartData.map((dish) => {
        if (dish.id == id) setAdded(true);
      });
    }
  }, [cartData]);

  function handleAddClick() {
    setAdded((p) => !p);
    changeDataOnClick();
    function changeDataOnClick() {
      if (!added) {
        setCartData([...cartData, dish]);
      } else {
        const newCartData = cartData.filter((dish) => dish.id != id);
        setCartData(newCartData);
      }
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("SingleDish", { dish, setAdded })}
        activeOpacity={0.7}
        style={[
          styles.bottom_container,
          { backgroundColor: colors.dish.background },
        ]}
      >
        <Image
          source={{
            uri: image || blankImage,
          }}
          style={styles.image}
        />
        <Text style={[styles.title, { color: colors.dish.title }]}>
          {dishTitle || "N/A"}
        </Text>
        <Text style={[styles.description, { color: colors.dish.description }]}>
          {dishDescription || "N/A"}
        </Text>
        <Text style={[styles.price, { color: colors.dish.price }]}>
          {currency.sign} {price || "N/A"}
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.add_circle, { backgroundColor: colors.accent }]}
          onPress={handleAddClick}
        >
          {added ? (
            <MaterialIcons name="done" size={18} />
          ) : (
            <AntDesign name="plus" size={18} />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  image: {
    width: cardSize,
    height: cardSize / 1.25,
  },
  bottom_container: {
    alignItems: "flex-start",
    width: cardSize,
    paddingBottom: cardSize / 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  title: {
    fontWeight: "bold",
    fontSize: cardSize / 10,
    paddingLeft: cardSize / 15,
    marginTop: cardSize / 15,
  },
  description: {
    paddingLeft: cardSize / 15,
    fontSize: cardSize / 12,
    color: "#595959",
  },
  price: {
    fontWeight: "bold",
    fontSize: cardSize / 9.5,
    paddingLeft: cardSize / 15,
  },
  add_circle: {
    width: cardSize / 6,
    height: cardSize / 6,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: cardSize / 3,
    position: "absolute",
    bottom: cardSize / 15,
    right: cardSize / 15,
  },
});
