import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Pressable } from "react-native";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import HomeScreen from "../screens/HomeScreen";
import FavouriteScreen from "../screens/FavouriteScreen";
import CartScreen from "../screens/CartScreen";
import MenuScreen from "../screens/MenuScreen";
import { useTheme } from "@react-navigation/native";
import { SingleDishScreen } from "../screens/SingleDishScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createNativeStackNavigator();
export function RootNavigator() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Screen
        name="SingleDish"
        component={SingleDishScreen}
        options={{
          animation: "fade_from_bottom",
          headerShown: true,
          title: "",
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerTintColor: colors.headerText,
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          animation: "fade_from_bottom",
          headerShown: true,
          title: "",
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerTintColor: colors.headerText,
        }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  const { colors } = useTheme();

  return (
    <BottomTab.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.bottomTab.background,
          height: 60,
        },
        tabBarActiveTintColor: colors.bottomTab.active,
        tabBarInactiveTintColor: colors.bottomTab.inactive,
      }}
    >
      <BottomTab.Screen
        name="home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={25} color={color} />
          ),
          tabBarLabel: () => null,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                marginRight: 15,
                borderRadius: 50,
                backgroundColor: "#000",
                width: 35,
                height: 35,
                justifyContent: "center",
                alignItems: "center",
              })}
            >
              <AntDesign
                name="shoppingcart"
                size={20}
                color="#fff"
                style={{ marginRight: 2 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="favourite"
        component={FavouriteScreen}
        options={{
          title: "Favourite",
          tabBarIcon: ({ color }) => (
            <AntDesign name="staro" size={25} color={color} />
          ),
          tabBarLabel: () => null,
          headerShown: true,
          title: "Favourites",
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerTintColor: colors.headerText,
        }}
      />
      <BottomTab.Screen
        name="cart"
        component={CartScreen}
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <AntDesign name="shoppingcart" size={25} color={color} />
          ),
          tabBarLabel: () => null,
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerTintColor: colors.headerText,
        }}
      />
      <BottomTab.Screen
        name="menu"
        component={MenuScreen}
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Entypo name="menu" size={30} color={color} />
          ),
          tabBarLabel: () => null,
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerTintColor: colors.headerText,
        }}
      />
    </BottomTab.Navigator>
  );
}
