import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  Linking,
} from "react-native";
import ImageAutoHeight from "react-native-image-auto-height";
import { Link } from "../components/Link";

const headerMarginTop = StatusBar.currentHeight;
const deviceWidth = Dimensions.get("window").width;
export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageAutoHeight
        source={require("../assets/images/full_logo.png")}
        style={styles.full_logo}
      />
      <Text style={styles.text}>
        The cheapest and simplest way to make your own fully customizable
        restaurant menu app.
      </Text>
      <View style={styles.links_container}>
        <Link
          linkUrl="https://sumanbiswas.vercel.app/"
          linkTitle="Everything You Need To Know"
        />
        <Link
          linkUrl="https://sumanbiswas.vercel.app/"
          linkTitle="Apply For Your Menu App"
        />
        <Link
          linkUrl="https://sumanbiswas.vercel.app/"
          linkTitle="Contact Me"
        />
        <Link
          linkUrl="https://sumanbiswas.vercel.app/"
          linkTitle="My Website"
        />
      </View>
      <Text style={styles.copyright_text}>&copy; Suman Biswas, 2022</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: headerMarginTop,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
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
  full_logo: {
    height: "auto",
    width: 130,
  },
  text: {
    width: deviceWidth - 100,
    textAlign: "center",
    fontSize: 16,
    color: "#595959",
    marginVertical: 40,
  },
  links_container: {
    alignItems: "flex-start",
  },
  copyright_text: {
    position: "absolute",
    bottom: 0,
    color: "#595959",
    fontSize: 13,
  },
});
