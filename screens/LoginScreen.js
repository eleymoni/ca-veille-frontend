import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import theme from "../core/theme";
import FormField from "../components/FormField";
import FormFieldWithIcon from "../components/FormFieldWithIcon";

export default function RegisterScreen({ navigation }) {
    // TODO : Connect with Google
    const handleConnectBtn = () => {};

    const handleLoginBtn = () => {
        navigation.navigate("TabNavigator");
    };

    const handleSubscribeBtn = () => {
        navigation.navigate("Register");
    };

    return (
        <View style={styles.container}>
            <Image
                style={{ width: 320, height: 90 }}
                resizeMode="contain"
                source={require("../assets/images/logo_light_mode.png")}
            />
            <Text style={styles.heading}>Ne cherchez plus, veillez.</Text>
            <View style={styles.googleConnectionContainer}>
                <Image
                    source={require("../assets/logo_google.png")}
                    style={{ width: 25, height: 45 }}
                />
                <Text>Se Connecter avec Google</Text>
            </View>
            <FormField label={"E-mail"} placeHolder={"johndoe@gmail.com"} />
            <FormFieldWithIcon
                label={"Mot de passe"}
                placeHolder={"Entrez votre mot de passe..."}
            />
            <TouchableOpacity onPress={handleLoginBtn}>
                <Text style={styles.btn}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubscribeBtn}>
                <Text style={styles.link}>S'inscrire</Text>
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
    googleConnectionContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderColor: theme.colors.text_gray,
        borderWidth: 1,
        borderRadius: 10,
        width: 300,
        height: 50,
        marginBottom: 50,
        gap: 20,
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
