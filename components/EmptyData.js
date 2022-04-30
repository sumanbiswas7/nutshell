import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

export function EmptyData({ textColor, imageSrc, text, imageWidth, children }) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {children}
      <Text style={[styles.cart_text, { color: textColor || "#d2d2d2" }]}>
        {text || "text"}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cart_text: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: "bold",
  },
});
