import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationBackArrow from "../components/NavigationBackArrow";
import theme from "../core/theme";
import { logout } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { deleteUser, getEmail } from "../constants/Urls";

export default function SettingsUserScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const user = useSelector((state) => state.user.value);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                setEmail(await getEmail(user.token));
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération de l'email :",
                    error
                );
            }
        };

        fetchEmail();
    }, [user.token]);

    const handleDisconnect = () => {
        Alert.alert(
            "Confirmation de déconnexion",
            "Voulez-vous vous déconnecter ?",
            [
                {
                    text: "Annuler",
                    style: "cancel",
                },
                {
                    text: "Se déconnecter",
                    onPress: () => {
                        dispatch(logout());
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "Login" }],
                        });
                    },
                    style: "destructive",
                },
            ],
            {
                cancelable: true,
            }
        );
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            "Confirmation de suppression",
            "Voulez-vous supprimer votre compte ?",
            [
                {
                    text: "Annuler",
                    style: "cancel",
                },
                {
                    text: "Supprimer mon compte",
                    onPress: async () => {
                        const result = await deleteUser(user.token);
                        if (result) {
                            dispatch(logout());
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "Register" }],
                            });
                        }
                    },
                    style: "destructive",
                },
            ],
            {
                cancelable: true,
            }
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <NavigationBackArrow />
            <View style={styles.titleContainer}>
                <FontAwesome6
                    name="user"
                    size={32}
                    color={theme.colors.text_dark}
                />
                <Text style={styles.title}>paramètres utilisateur</Text>
            </View>
            <View style={styles.textContainer}>
                <View>
                    <Text style={styles.text}>Nom : {user.username}</Text>
                    <Text style={styles.text}>Email : {email}</Text>
                </View>
                <TouchableOpacity onPress={handleDisconnect}>
                    <Text style={[styles.text, styles.redText]}>
                        Se déconnecter
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteAccount}>
                    <Text style={[styles.text, styles.redText]}>
                        Supprimer le compte
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.bg_White,
        paddingHorizontal: 32,
    },
    titleContainer: {
        flexDirection: "row",
        gap: 20,
        marginBottom: 40,
    },
    title: {
        fontFamily: theme.fonts.comfortaaBold,
        fontSize: theme.fontSizes.header,
    },
    textContainer: {
        gap: 60,
    },
    text: {
        fontFamily: theme.fonts.comfortaaSemiBold,
        fontSize: theme.fontSizes.medium,
    },
    redText: {
        fontFamily: theme.fonts.comfortaaBold,
        color: theme.colors.red,
    },
});
