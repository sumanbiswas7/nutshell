import { StyleSheet } from "react-native";
import { RootNavigator } from "./navigation";
import { createContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { defaultTheme } from "./themes/themes";

const ThemeContex = createContext();
export default function App() {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);
  const themeContexValue = { currentTheme, setCurrentTheme };
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
