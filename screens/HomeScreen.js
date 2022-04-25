import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import { Cart } from "../components/Cart";
import { StatusBar as ESB } from "expo-status-bar";
import { useTheme } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { HeaderLogo } from "../components/HeaderLogo";
import { SearchBox } from "../components/SearchBox";
import { DishCard } from "../components/DishCard";
import { AppLoading } from "../components/AppLoading";
import { CartContex, HomeContex } from "../App";
import { DISHES_QUERY, client } from "../hooks/useRequest";
import { DishTypeButton } from "../components/DishTypeButton";

const headerMarginTop = StatusBar.currentHeight;
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const headerHeight = 180;
const flatListHeight = deviceHeight - (60 + headerHeight + headerMarginTop);
export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const { homeData, setHomeData } = useContext(HomeContex);
  const { cartData } = useContext(CartContex);
  const [isLoading, setIsLoading] = useState(true);
  const [dishesByType, setDishesByType] = useState([]);
  const [dishTypes, setDishTypes] = useState({
    activeType: { id: 2, type: "Main" },
    types: [
      { id: 1, type: "Starter" },
      { id: 2, type: "Main" },
      { id: 3, type: "Drinks" },
      { id: 4, type: "Dessert" },
    ],
  });
  useEffect(() => {
    client.request(DISHES_QUERY).then((data) => {
      setHomeData(data.dishes);
      const filterByTypeArr = data.dishes.filter((dish) => dish.type == "main");
      setDishesByType(filterByTypeArr);
      setIsLoading(false);
    });
  }, []);

  function handleDishTypeClick(type, id) {
    setDishTypes({ ...dishTypes, activeType: { id, type } });
    const filterByTypeArr = homeData.filter(
      (dish) => dish.type == type.toLowerCase()
    );
    setDishesByType(filterByTypeArr);
  }
  function setClass(id) {
    if (dishTypes.activeType?.id == id) return true;
    else return false;
  }

  if (isLoading) return <AppLoading />;
  return (
    <>
      <View style={styles.container}>
        <View
          style={[styles.header_container, { backgroundColor: colors.accent }]}
        >
          <View style={styles.header}>
            <HeaderLogo />
            <Cart navigation={navigation} count={cartData.length} />
          </View>
          <SearchBox />
          <FlatList
            data={dishTypes.types}
            horizontal
            style={styles.dish_type_list}
            justifyContent="center"
            alignItems="center"
            renderItem={({ item }) => {
              return (
                <DishTypeButton
                  title={item.type}
                  onPress={handleDishTypeClick}
                  id={item.id}
                  active={setClass(item.id)}
                />
              );
            }}
          />
        </View>
        <FlatList
          data={dishesByType}
          numColumns={2}
          width={deviceWidth}
          style={styles.flat_list}
          alignItems="center"
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
      <ESB backgroundColor={colors.accent} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: headerMarginTop,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  header_container: {
    top: 0,
    position: "absolute",
    width: deviceWidth,
    paddingTop: 10,
    height: headerHeight,
  },
  header: {
    width: deviceWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
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
    height: flatListHeight,
    flexGrow: 0,
  },
  dish_type_list: {
    width: deviceWidth,
    backgroundColor: "#FFF",
    paddingVertical: 10,
  },
});
