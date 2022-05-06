import { StyleSheet } from "react-native";
import { RootNavigator } from "./navigation";
import { createContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { AppLoading } from "./components/AppLoading";
import { CURRENCY, THEME } from "./global/constants";
import { MenuProvider } from "react-native-popup-menu";

export const ThemeContex = createContext();
export const CartContex = createContext();
export const HomeContex = createContext();
export const FavouriteContex = createContext();
export const CurrencyContex = createContext();

export default function App() {
  const [currentTheme, setCurrentTheme] = useState(THEME);
  const [cartData, setCartData] = useState([]);
  const [homeData, setHomeData] = useState([]);
  const [favouriteData, setFavouriteData] = useState([]);
  const themeContexValue = { currentTheme, setCurrentTheme };
  const cartContexvalue = { cartData, setCartData };
  const homeContexValue = { homeData, setHomeData };
  const favouriteContexValue = { favouriteData, setFavouriteData };
  const currencyContexValue = CURRENCY;

  let [fontsLoaded] = useFonts({
    "font-1": require("./assets/fonts/JustAnotherHandRegular.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <MenuProvider>
      <CurrencyContex.Provider value={currencyContexValue}>
        <ThemeContex.Provider value={themeContexValue}>
          <HomeContex.Provider value={homeContexValue}>
            <CartContex.Provider value={cartContexvalue}>
              <FavouriteContex.Provider value={favouriteContexValue}>
                <NavigationContainer theme={currentTheme}>
                  <RootNavigator />
                </NavigationContainer>
              </FavouriteContex.Provider>
            </CartContex.Provider>
          </HomeContex.Provider>
        </ThemeContex.Provider>
      </CurrencyContex.Provider>
    </MenuProvider>
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
