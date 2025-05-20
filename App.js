import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import {
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
} from "@expo-google-fonts/comfortaa";
import {
    OpenSans_400Regular,
    OpenSans_600SemiBold,
} from "@expo-google-fonts/open-sans";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {FontAwesome5} from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import PopularScreen from './screens/PopularScreen';
import FollowedScreen from './screens/FollowedScreen';
import FavorisScreen from './screens/FavorisScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import theme from "./core/theme";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Accueil') {
          iconName = 'home';
        } else if (route.name === 'Catégories') {
          iconName = 'list';
        } else if (route.name === 'Populaire') {
          iconName = 'fire-alt';
        } else if (route.name === 'Suivis') {
          iconName = 'user-plus';
        } else if (route.name === 'Favoris') {
          iconName = 'star';
        } 

        return <FontAwesome5 name={iconName} size={25} color={color} />;
      },
      tabBarActiveTintColor: theme.colors.text_light,
      tabBarInactiveTintColor: theme.colors.text_gray,
      headerShown: false,
      tabBarStyle: {
        backgroundColor: theme.colors.blue,
        height: 76,
        paddingBottom: 22,
      },
      tabBarIconStyle: {marginTop: 10},
      tabBarLabelStyle: {
        fontSize : theme.fontSizes.small,
        marginTop: 4,
      }
    })}>
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Catégories" component={CategoriesScreen} />
      <Tab.Screen name="Populaire" component={PopularScreen} />
      <Tab.Screen name="Suivis" component={FollowedScreen} />
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
      <View style ={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Chargement...</Text>
      </View>
    )
  }

  return (
    // <View style={{ fontFamily: theme.fonts.comfortaaBold }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
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
