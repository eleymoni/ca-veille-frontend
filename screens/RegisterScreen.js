import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import theme from "../core/theme";
import FormField from "../components/FormField";
import FormFieldWithIcon from "../components/FormFieldWithIcon";

export default function RegisterScreen({ navigation }) {
    // TODO : Connect with Google
    const handleConnectWithGoogle = () => {};

    const handleRegisterBtn = () => {
        navigation.navigate("TabNavigator");
    };

    const handleSubscribeBtn = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <Image
                style={{ width: 320, height: 90 }}
                resizeMode="contain"
                source={require("../assets/images/logo_light_mode.png")}
            />
            <Text style={styles.heading}>Ne cherchez plus, veillez.</Text>

            <FormField
                label={"Nom d'utilisateur"}
                placeHolder={"Entrez votre pseudo"}
            />
            <FormField label={"E-mail"} placeHolder={"johndoe@gmail.com"} />
            <FormFieldWithIcon
                label={"Mot de passe"}
                placeHolder={"Entrez votre mot de passe..."}
            />
            <FormFieldWithIcon
                label={"Confirmer le mot de passe"}
                placeHolder={"Confirmez votre mot de passe..."}
            />
            <TouchableOpacity onPress={handleRegisterBtn}>
                <Text style={styles.btn}>S'inscrire</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubscribeBtn}>
                <Text style={styles.link}>Retour à la page de connexion</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    heading: {
        fontSize: 20,
        textAlign: "center",
        color: theme.colors.text_gray,
        fontFamily: theme.fonts.comfortaaBold,
        marginTop: 65,
        marginBottom: 55,
    },
    btn: {
        color: "#fff",
        backgroundColor: theme.colors.blue,
        padding: 15,
        borderRadius: 30,
        width: 180,
        textAlign: "center",
        marginTop: 45,
        marginBottom: 80,
        fontFamily: theme.fonts.openSansSemiBold,
    },
    link: {
        fontSize: theme.fontSizes.medium,
        fontWeight: theme.fonts.openSansSemiBold,
    },
});
