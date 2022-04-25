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

  useEffect(() => {
    client.request(DISHES_QUERY).then((data) => {
      setIsLoading(false);
      setHomeData(data.dishes);
    });
  }, []);
  const dishes = homeData;

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
          <ScrollView
            horizontal
            style={styles.dish_type_list}
            alignItems="center"
            justifyContent="center"
          >
            <DishTypeButton title="Starter" />
            <DishTypeButton title="Main" />
            <DishTypeButton title="Drinks" />
            <DishTypeButton title="Dessert" />
          </ScrollView>
        </View>
        <FlatList
          data={dishes}
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
