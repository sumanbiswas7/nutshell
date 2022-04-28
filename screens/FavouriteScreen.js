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

const headerMarginTop = StatusBar.currentHeight;
const deviceWidth = Dimensions.get("window").width;

export default function FavouriteScreen({ navigation }) {
  const { favouriteData } = useContext(FavouriteContex);

  return (
    <View style={styles.container}>
      <FlatList
        data={favouriteData}
        numColumns={2}
        width={deviceWidth}
        style={styles.flat_list}
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
});
