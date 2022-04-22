import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    default: require("../assets/fonts/JustAnotherHandRegular.ttf"),
  });
