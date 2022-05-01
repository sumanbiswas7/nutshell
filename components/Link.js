import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@react-navigation/native";

const circleSize = 12;
const defaultMarginVertical = 7;
export function Link({ linkUrl, linkTitle, spacingV }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(linkUrl || "")}
      style={[
        styles.container,
        { marginVertical: spacingV || defaultMarginVertical },
      ]}
    >
      <View style={[styles.circle, { backgroundColor: colors.accent }]} />
      <Text style={[styles.link_text, { color: colors.text }]}>
        {linkTitle || "linkTitle prop is empty"}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    marginRight: 10,
  },
  link_text: {
    fontSize: 16,
  },
});
