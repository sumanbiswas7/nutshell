import { StyleSheet, ActivityIndicator } from "react-native";
import { RootNavigator } from "./navigation";
import { createContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { defaultTheme } from "./themes/themes";
import { useFonts } from "expo-font";
import { AppLoading } from "./components/AppLoading";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const ThemeContex = createContext();
export const CartContex = createContext();
export const FavouriteContex = createContext();
export default function App() {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);
  const [cartData, setCartData] = useState([]);
  const [favouriteData, setFavouriteData] = useState([]);
  const themeContexValue = { currentTheme, setCurrentTheme };
  const cartContexvalue = { cartData, setCartData };
  const favouriteContexValue = { favouriteData, setFavouriteData };

  let [fontsLoaded] = useFonts({
    "font-1": require("./assets/fonts/JustAnotherHandRegular.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const client = new ApolloClient({
    cache: new InMemoryCache({}),
    uri: "https://nutshell-server-api.herokuapp.com/",
  });

  return (
    <ApolloProvider client={client}>
      <ThemeContex.Provider value={themeContexValue}>
        <CartContex.Provider value={cartContexvalue}>
          <FavouriteContex.Provider value={favouriteContexValue}>
            <NavigationContainer theme={currentTheme}>
              <RootNavigator />
            </NavigationContainer>
          </FavouriteContex.Provider>
        </CartContex.Provider>
      </ThemeContex.Provider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
