import { StyleSheet, ActivityIndicator } from "react-native";
import { RootNavigator } from "./navigation";
import { createContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { defaultTheme } from "./themes/themes";
import { useFonts } from "expo-font";
import { AppLoading } from "./components/AppLoading";

const ThemeContex = createContext();
export default function App() {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);
  const themeContexValue = { currentTheme, setCurrentTheme };

  let [fontsLoaded] = useFonts({
    "font-1": require("./assets/fonts/JustAnotherHandRegular.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ThemeContex.Provider value={themeContexValue}>
      <NavigationContainer theme={currentTheme}>
        <RootNavigator />
      </NavigationContainer>
    </ThemeContex.Provider>
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
