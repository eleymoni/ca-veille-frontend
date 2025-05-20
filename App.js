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

import theme from "../core/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
  });

  if (!fontsLoaded) {
    return null; // ou un <LoadingScreen />
  }

  return (
    <View style={{ fontFamily: theme.fonts.comfortaaBold }}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
