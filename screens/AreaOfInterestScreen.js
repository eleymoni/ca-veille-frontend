import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import theme from "../core/theme";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../reducers/user";
import { createDefaultCategories } from "../constants/Urls";

const defaultCategories = [
    { name: "tech", image: require("../assets/images/logo_light_mode.png") },
    { name: "movies", image: require("../assets/images/logo_light_mode.png") },
    { name: "news", image: require("../assets/images/logo_light_mode.png") },
    { name: "sports", image: require("../assets/images/logo_light_mode.png") },
    { name: "cooking", image: require("../assets/images/logo_light_mode.png") },
    { name: "science", image: require("../assets/images/logo_light_mode.png") },
    { name: "health", image: require("../assets/images/logo_light_mode.png") },
    {
        name: "videoGames",
        image: require("../assets/images/logo_light_mode.png"),
    },
    { name: "music", image: require("../assets/images/logo_light_mode.png") },
    { name: "design", image: require("../assets/images/logo_light_mode.png") },
    {
        name: "performance",
        image: require("../assets/images/logo_light_mode.png"),
    },
    { name: "economy", image: require("../assets/images/logo_light_mode.png") },
];

export default function AreaOfInterest({ navigation }) {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.value.token);
    const [selected, setSelected] = useState([]);

    const handlepress = async () => {
        if (selected) {
            const data = await createDefaultCategories(selected, token);
            if (data.result) {
                dispatch(setCategories(data.category));
                navigation.reset({
                    index: 0,
                    routes: [{ name: "TabNavigator" }],
                });
            }
        }
    };

    const toggle = (name) => {
        setSelected(
            (prev) =>
                prev.includes(name)
                    ? prev.filter((n) => n !== name) // désélectionne
                    : [...prev, name] // ajoute
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Quels sont vos centres d'intérêt ?</Text>
            <View style={styles.categoriesContainer}>
                {defaultCategories.map((category) => {
                    const isSelected = selected.includes(category.name);
                    return (
                        <TouchableOpacity
                            key={category.name}
                            onPress={() => toggle(category.name)}
                            style={[
                                styles.categoryCard,
                                isSelected && styles.categoryCardSelected,
                            ]}
                        >
                            <ImageBackground
                                source={category.image}
                                style={styles.categoryImage}
                                resizeMode="cover"
                            >
                                <View style={styles.overlay} />
                                <Text style={styles.categoryName}>
                                    {category.name}
                                </Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <TouchableOpacity style={styles.button} onPress={handlepress}>
                <Text style={styles.textButton}>
                    {selected.length === 0 ? "Ignorer" : "Continuer"}
                </Text>
                <FontAwesome6
                    name="arrow-right"
                    size={18}
                    color={theme.colors.text_light}
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
    },
    title: {
        fontFamily: theme.fonts.comfortaaBold,
        fontSize: theme.fontSizes.xlarge,
        marginTop: 20,
        marginBottom: 40,
    },
    categoriesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
    },
    categoryCard: {
        width: 95,
        height: 95,
        borderRadius: 12,
        overflow: "hidden",
    },
    categoryCardSelected: {
        borderRadius: 20,
        borderWidth: 5,
        padding: 5,
        borderColor: theme.colors.blue,
    },
    categoryImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 12,
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    categoryName: {
        position: "absolute",
        color: theme.colors.text_light,
        fontFamily: theme.fonts.openSansSemiBold,
        fontSize: theme.fontSizes.small,
        textTransform: "capitalize",
    },
    button: {
        padding: 20,
        backgroundColor: theme.colors.blue,
        borderRadius: 30,
        alignSelf: "flex-end",
        marginTop: "auto",
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },
    textButton: {
        color: theme.colors.text_light,
        fontFamily: theme.fonts.comfortaaSemiBold,
        fontSize: theme.fontSizes.medium,
    },
});
