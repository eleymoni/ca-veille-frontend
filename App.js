import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform } from "react-native";
import { useFonts } from "expo-font";
import {
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
} from "@expo-google-fonts/comfortaa";
import {
    OpenSans_400Regular,
    OpenSans_600SemiBold,
} from "@expo-google-fonts/open-sans";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import HomeScreen from "./screens/HomeScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import PopularScreen from "./screens/PopularScreen";
import FollowedScreen from "./screens/FollowedScreen";
import FavorisScreen from "./screens/FavorisScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CategoryScreen from "./screens/CategoryScreen";
import theme from "./core/theme";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import users from "./reducers/users";

const reducers = combineReducers({ users });
const persistConfig = {
    key: "ça veille",
    storage: AsyncStorage,
};
const store = configureStore({
    reducer: persistReducer(persistConfig, reducers),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    // marge android

    const insets = useSafeAreaInsets().bottom;
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName = "";

                    if (route.name === "Accueil") {
                        iconName = "home";
                    } else if (route.name === "Catégories") {
                        iconName = "list";
                    } else if (route.name === "Populaire") {
                        iconName = "fire-alt";
                    } else if (route.name === "Abonnements") {
                        iconName = "user-plus";
                    } else if (route.name === "Favoris") {
                        iconName = "star";
                    }

                    return (
                        <FontAwesome5 name={iconName} size={25} color={color} />
                    );
                },
                tabBarActiveTintColor: theme.colors.text_light,
                tabBarInactiveTintColor: theme.colors.text_gray,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.colors.blue,
                    height: 80 + insets,
                    paddingTop: 10,
                    paddingBottom: 15 + insets,
                },
                tabBarLabelStyle: {
                    fontSize: theme.fontSizes.small,
                },
            })}
        >
            <Tab.Screen name="Accueil" component={HomeScreen} />
            <Tab.Screen name="Catégories" component={CategoriesScreen} />
            <Tab.Screen name="Populaire" component={PopularScreen} />
            <Tab.Screen name="Abonnements" component={FollowedScreen} />
            <Tab.Screen name="Favoris" component={FavorisScreen} />
        </Tab.Navigator>
    );
};

export default function App() {
    const [fontsLoaded] = useFonts({
        Comfortaa_600SemiBold,
        Comfortaa_700Bold,
        OpenSans_400Regular,
        OpenSans_600SemiBold,
    });

    if (!fontsLoaded) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>Chargement...</Text>
            </View>
        );
    }

    return (
        // <View style={{ fontFamily: theme.fonts.comfortaaBold }}>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <Stack.Navigator screenOptions={{ headerShown: false }}>
                            <Stack.Screen
                                name="Register"
                                component={RegisterScreen}
                            />
                            <Stack.Screen
                                name="Login"
                                component={LoginScreen}
                            />
                            <Stack.Screen
                                name="Category"
                                component={CategoryScreen}
                            />
                            <Stack.Screen
                                name="TabNavigator"
                                component={TabNavigator}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
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
