import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  Dimensions,
} from "react-native";
import { DishCard } from "../components/DishCard";
import { useContext } from "react";
import { FavouriteContex } from "../App";
import { EmptyData } from "../components/EmptyData";
import ImageAutoHeight from "react-native-image-auto-height";
import { useTheme } from "@react-navigation/native";

const headerMarginTop = StatusBar.currentHeight;
const deviceWidth = Dimensions.get("window").width;

export default function FavouriteScreen({ navigation }) {
  const { favouriteData } = useContext(FavouriteContex);
  const { colors } = useTheme();

  if (favouriteData.length == 0)
    return (
      <EmptyData text="You don't have any favourites" imageWidth={100}>
        <ImageAutoHeight
          source={require("../assets/images/no_favourites.png")}
          style={styles.empty_img}
        />
      </EmptyData>
    );
  return (
    <View style={styles.container}>
      <FlatList
        data={favouriteData}
        numColumns={2}
        width={deviceWidth}
        style={[styles.flat_list, { backgroundColor: colors.background }]}
        alignItems={favouriteData.length > 1 ? "center" : "flex-start"}
        renderItem={({ item }) => {
          return (
            <DishCard
              image={item.image}
              title={item.name}
              description={item.description}
              price={item.price}
              id={item.id}
              navigation={navigation}
              dish={item}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  flat_list: {
    marginTop: 20,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
  },
  empty_img: {
    width: 80,
    height: "auto",
  },
});
