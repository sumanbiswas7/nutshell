import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";

export function AppLoading() {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.accent} size={25} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
