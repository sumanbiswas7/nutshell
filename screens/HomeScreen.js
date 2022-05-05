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
import { Fold } from "react-native-animated-spinkit";
import { DishCard } from "../components/DishCard";
import { AppLoading } from "../components/AppLoading";
import { CartContex, FavouriteContex, HomeContex } from "../App";
import { DISHES_QUERY, client } from "../hooks/useRequest";
import { DishTypeButton } from "../components/DishTypeButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DISH_TYPES } from "../global/constants";

const headerMarginTop = StatusBar.currentHeight;
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const headerHeight = 180;
const flatListHeight = deviceHeight - (60 + headerHeight + headerMarginTop);
export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const { homeData, setHomeData } = useContext(HomeContex);
  const { cartData } = useContext(CartContex);
  const { setFavouriteData } = useContext(FavouriteContex);
  const [isLoading, setIsLoading] = useState(true);
  const [dishesByType, setDishesByType] = useState([]);
  const [slowLoader, setSlowLoader] = useState(false);
  const [dishTypes, setDishTypes] = useState({
    activeType: { id: 2, type: "Main" },
    types: DISH_TYPES,
  });
  useEffect(() => {
    client.request(DISHES_QUERY).then((data) => {
      setHomeData(data.dishes);
      const filterByTypeArr = data.dishes.filter((dish) => dish.type == "main");
      setDishesByType(filterByTypeArr);
      setIsLoading(false);
    });
  }, []);
  useEffect(() => {
    setInitialFavData();
    async function setInitialFavData() {
      try {
        const jsonValue = await AsyncStorage.getItem("favourites");
        const res = jsonValue != null ? JSON.parse(jsonValue) : null;
        const initialFavArr = [];
        homeData.forEach((dish) => {
          if (res[dish.id]) {
            initialFavArr.push(dish);
          }
        });
        setFavouriteData(initialFavArr);
      } catch (e) {
        console.log(`Reading Local Storage Err - ${e}`);
      }
    }
  }, [isLoading]);

  function handleDishTypeClick(type, id) {
    setDishTypes({ ...dishTypes, activeType: { id, type } });
    setSlowLoader(true);
    const filterByTypeArr = homeData.filter(
      (dish) => dish.type == type.toLowerCase()
    );
    setDishesByType(filterByTypeArr);
    setSlowLoader(false);
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
          <Text
            onPress={() => navigation.navigate("Search")}
            style={styles.search}
          >
            Search Dish
          </Text>
          <FlatList
            data={dishTypes.types}
            horizontal
            style={[
              styles.dish_type_list,
              { backgroundColor: colors.background },
            ]}
            showsHorizontalScrollIndicator={false}
            alignItems="center"
            renderItem={({ item }) => {
              return (
                <DishTypeButton
                  title={item.title}
                  slug={item.slug}
                  onPress={handleDishTypeClick}
                  id={item.id}
                  active={setClass(item.id)}
                />
              );
            }}
          />
        </View>
        {slowLoader ? (
          <View style={styles.slowloader_container}>
            <Fold size={25} color={colors.accent} />
          </View>
        ) : (
          <FlatList
            data={dishesByType}
            numColumns={2}
            width={deviceWidth}
            style={styles.flat_list}
            alignItems={dishesByType.length > 1 ? "center" : "flex-start"}
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
        )}
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
  search: {
    width: deviceWidth,
    paddingBottom: 5,
    paddingLeft: 20,
    marginTop: 10,
    borderBottomColor: "rgba(0,0,0,0.4)",
    color: "rgba(0,0,0,0.4)",
    borderBottomWidth: 1,
    fontSize: 17,
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
    paddingHorizontal: 20,
  },
  dish_type_list: {
    width: deviceWidth,
    backgroundColor: "#FFF",
    paddingVertical: 10,
  },
  slowloader_container: {
    height: flatListHeight,
    alignItems: "center",
    justifyContent: "center",
  },
});
