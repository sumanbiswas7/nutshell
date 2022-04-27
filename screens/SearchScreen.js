import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { SearchBox } from "../components/SearchBox";
import { useState, useContext } from "react";
import { DishCard } from "../components/DishCard";
import { HomeContex } from "../App";
import { AntDesign } from "@expo/vector-icons";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
export default function SearchScreen({ navigation }) {
  const [noResult, setNoResult] = useState(true);
  const [searchResults, setsearchResults] = useState(false);
  const { homeData } = useContext(HomeContex);

  function handleSearchInput(text) {
    if (text.length == 0) {
      setNoResult(true);
      setsearchResults(false);
      return;
    }
    const resArr = [];
    homeData.forEach((dish) => {
      const lowerCaseDishName = dish.name.toLowerCase();
      const lowerCaseText = text.toLowerCase();
      if (lowerCaseDishName.includes(lowerCaseText)) {
        // console.log(`Dish -> ${lowerCaseDishName}, Text -> ${lowerCaseText}`);
        resArr.push(dish);
      }
      if (resArr.length > 0) {
        setNoResult(false);
        setsearchResults(resArr);
      }
    });
  }

  return (
    <View style={styles.container}>
      <SearchBox searchInput={handleSearchInput} />
      {noResult && (
        <>
          <View style={styles.result_container}>
            <AntDesign name="search1" size={60} color={"#d2d2d2"} />
            <Text style={styles.result_text}>No Dishes Found</Text>
          </View>
        </>
      )}
      {searchResults && (
        <>
          <Text style={styles.found_res_text}>
            {searchResults.length > 1 ? (
              <>{searchResults.length} Dishes Found</>
            ) : (
              <>{searchResults.length} Dish Found</>
            )}
          </Text>
          <FlatList
            data={searchResults}
            numColumns={2}
            width={deviceWidth}
            style={styles.flat_list}
            alignItems={searchResults.length > 1 ? "center" : "flex-start"}
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
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  result_text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 45,
    color: "#d2d2d2",
  },
  result_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  found_res_text: {
    marginVertical: 10,
    width: deviceWidth,
    marginLeft: 40,
    fontSize: 15,
    fontWeight: "bold",
  },
  flat_list: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
});
