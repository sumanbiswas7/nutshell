import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  FlatList,
} from "react-native";
import { Cart } from "../components/Cart";
import { StatusBar as ESB } from "expo-status-bar";
import { useTheme } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { HeaderLogo } from "../components/HeaderLogo";
import { SearchBox } from "../components/SearchBox";
import { DishCard } from "../components/DishCard";
import { dishes } from "../DATA";

const headerMarginTop = StatusBar.currentHeight;
const deviceWidth = Dimensions.get("window").width;
export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();

  return (
    <>
      <View style={styles.container}>
        <View
          style={[styles.header_container, { backgroundColor: colors.accent }]}
        >
          <View style={styles.header}>
            <HeaderLogo />
            <Cart navigation={navigation} />
          </View>
          <SearchBox />
        </View>
        <FlatList
          data={dishes}
          numColumns={2}
          width={deviceWidth}
          style={styles.flat_list}
          justifyContent="center"
          alignItems="center"
          renderItem={({ item }) => {
            return (
              <DishCard
                image={item.image}
                title={item.name}
                description={item.description}
                price={item.price}
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
    justifyContent: "center",
  },
  header_container: {
    top: 0,
    position: "absolute",
    width: deviceWidth,
    paddingTop: 30,
    paddingBottom: 10,
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
    marginTop: 145,
  },
});
