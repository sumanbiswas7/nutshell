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
import { gql, useQuery } from "@apollo/client";
import { AppLoading } from "../components/AppLoading";

const deviceWidth = Dimensions.get("window").width;
const headerMarginTop = StatusBar.currentHeight;
const favBoxSize = 35;
export function SingleDishScreen({ navigation, route }) {
  const { colors } = useTheme();
  const [isFav, setIsFav] = useState(false);
  const { id } = route.params;
  const SINGLE_DISH_QUERY = gql`
    query ($dishId: ID!) {
      getDish(id: $dishId) {
        image
        name
        description
        price
      }
    }
  `;
  function handleFavClick() {
    setIsFav((p) => !p);
  }
  const { loading, data, error } = useQuery(SINGLE_DISH_QUERY, {
    variables: { dishId: id },
  });
  if (loading) return <AppLoading />;
  if (error) console.log(error);
  const dish = data?.getDish || [];

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
      <BottomFeature price={dish.price} />
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
