import { View, Text, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import NavigationBackArrow from "../components/NavigationBackArrow";
import { Ionicons } from "@expo/vector-icons";
import theme from "../core/theme";

export default function SettingsAppScreen() {
    const [isDark, setIsDark] = useState(false);

    const toggleMode = async () => {
        setIsDark((prev) => !prev);
    };

    return (
        <SafeAreaView style={styles.container}>
            <NavigationBackArrow />
            <View style={styles.titleContainer}>
                <Ionicons
                    name="settings-outline"
                    size={32}
                    color={theme.colors.icon_dark}
                />
                <Text style={styles.title}>Paramètres de l'application</Text>
            </View>
            <Text style={styles.text}>Notifications</Text>
            <View style={styles.switchContainer}>
                <Text style={styles.text}>Apparence :</Text>
                <Ionicons
                    name="sunny-outline"
                    size={25}
                    color={theme.colors.blue}
                />
                <Switch
                    trackColor={{
                        false: theme.colors.icon_gray,
                        true: theme.colors.blue,
                    }}
                    thumbColor={isDark ? "#A0A0FF" : theme.colors.bg_gray}
                    ios_backgroundColor={theme.colors.blue}
                    onValueChange={toggleMode}
                    value={isDark}
                />
                <Ionicons
                    name="moon-outline"
                    size={25}
                    color={theme.colors.blue}
                />
            </View>
            <Text style={styles.text}>Langue</Text>
            <Text style={styles.text}>
                Votre avis compte ! Laissez-nous une note sur le store{" "}
            </Text>
            <View style={{ flexDirection: "row", marginTop: -20 }}>
                {/* méthode (voir mdn array.from) 
                Utilisation de _ pour dire je me fiche de la valeur, j'ai juste besoin de i (convention)*/}
                {Array.from({ length: 5 }).map((_, i) => (
                    <Ionicons
                        key={i}
                        name="star-outline"
                        size={20}
                        color={theme.colors.blue}
                    />
                ))}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.bg_White,
        paddingHorizontal: 30,
    },
    titleContainer: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 40,
        alignItems: "flex-end",
    },
    title: {
        fontFamily: theme.fonts.comfortaaBold,
        fontSize: theme.fontSizes.header,
    },
    text: {
        fontFamily: theme.fonts.comfortaaSemiBold,
        fontSize: theme.fontSizes.medium,
        marginVertical: 30,
        marginRight: 4,
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
});
