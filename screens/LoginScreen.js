import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    TouchableNativeFeedback,
    Platform,
    Keyboard,
} from "react-native";
import theme from "../core/theme";
import FormField from "../components/FormField";
import FormFieldWithIcon from "../components/FormFieldWithIcon";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../reducers/user";

export default function LoginScreen({ navigation }) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleForm = async () => {
        const data = {
            email,
            password,
        };
        const postData = await fetch(
            `${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/login`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }
        );
        // Check for response status code
        const status = postData.status;
        if (status === 400) {
            return setErrorMessage("Tous les champs sont requis");
        } else if (status === 401) {
            return setErrorMessage("Adresse mail ou mot de passe invalide");
        }
        const response = await postData.json();
        const user = response.user;

        dispatch(
            addUser({
                username: user.username,
                token: user.token,
                categories: user.categories,
                favoriteArticles: user.favoriteArticles,
                followedUsers: user.followedUsers,
                followers: user.followers,
                isPublic: user.isPublic,
            })
        );
        navigation.navigate("TabNavigator");
    };

    // TODO : Connect with Google
    const handleConnectBtn = () => {};

    const handleSubscribeBtn = () => {
        navigation.navigate("Register");
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableNativeFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Image
                        style={{ width: 320, height: 90 }}
                        resizeMode="contain"
                        source={require("../assets/images/logo_light_mode.png")}
                    />
                    <Text style={styles.heading}>
                        Ne cherchez plus, veillez.
                    </Text>
                    <View style={styles.googleConnectionContainer}>
                        <Image
                            source={require("../assets/logo_google.png")}
                            style={{ width: 25, height: 45 }}
                        />
                        <Text>Se Connecter avec Google</Text>
                    </View>
                    <FormField
                        label={"E-mail"}
                        placeHolder={"johndoe@gmail.com"}
                        setInput={setEmail}
                        input={email}
                    />
                    <FormFieldWithIcon
                        label={"Mot de passe"}
                        placeHolder={"Entrez votre mot de passe..."}
                        setInput={setPassword}
                        input={password}
                    />
                    {errorMessage && (
                        <Text style={styles.danger}>{errorMessage}</Text>
                    )}
                    <TouchableOpacity onPress={handleForm}>
                        <Text style={styles.btn}>Connexion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSubscribeBtn}>
                        <Text style={styles.link}>S'inscrire</Text>
                    </TouchableOpacity>
                </View>
            </TouchableNativeFeedback>
        </KeyboardAvoidingView>
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
        fontSize: theme.fontSizes.header,
        textAlign: "center",
        color: theme.colors.text_gray,
        fontFamily: theme.fonts.comfortaaBold,
        marginTop: 25,
        marginBottom: 60,
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
    danger: {
        marginTop: 20,
        textAlign: "center",
        color: "red",
    },
});
