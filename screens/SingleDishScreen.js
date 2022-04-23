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
import { useState } from "react";
import { BottomFeature } from "../components/BottomFeature";
import { AntDesign } from "@expo/vector-icons";

const deviceWidth = Dimensions.get("window").width;
const headerMarginTop = StatusBar.currentHeight;
const favBoxSize = 35;
const DUMMY_DATA = {
  name: "Healthy Salad",
  price: 129,
  description: "super healthy salad",
  image:
    "https://loveincorporated.blob.core.windows.net/contentimages/gallery/d9e900e4-212e-4c3d-96d5-cb14a023c659-worlds-most-delicious-dishes.jpg",
  type: "starter",
  id: 4,
};
export function SingleDishScreen({ navigation }) {
  const { colors } = useTheme();
  const [isFav, setIsFav] = useState(false);
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
          source={{ uri: DUMMY_DATA.image }}
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
      <Text style={styles.dish_name}>{DUMMY_DATA.name}</Text>
      <Text style={styles.dish_description}>{DUMMY_DATA.description}</Text>
      <BottomFeature />
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
    marginTop: 50,
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
