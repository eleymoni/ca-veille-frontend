import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import { getContrastingTextColor } from "../utils/InverseColorUtils";
import ColorPicker from "react-native-wheel-color-picker";
import theme from "../core/theme";
import { createCategory } from "../constants/Urls";
import { useSelector } from "react-redux";

export default function AddCategoryScreen() {
    const navigation = useNavigation();
    const [inputCategory, setInputCategory] = useState("");
    const [inputColor, setInputColor] = useState(theme.colors.blue);
    const [textError, setTextError] = useState("");

    const handleAddCategory = async () => {
        const token = useSelector((state) => state.user.value.token);
        const trimmed = inputCategory.trim();
        if (!trimmed) return setTextError("Rentrer un nom à la catégorie");
        const data = await createCategory(trimmed, inputColor, token);

        if (data.result) {
            setTextError("");
            setInputCategory("");
            setInputColor(theme.colors.blue);
        } else {
            setTextError("Cette catégorie existe déjà");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Retour */}
            <TouchableOpacity
                style={styles.back}
                onPress={() => navigation.goBack()}
            >
                <FontAwesome6
                    name="arrow-left"
                    size={28}
                    color={theme.colors.icon_gray}
                />
            </TouchableOpacity>
            <Text style={styles.title}>Nouvelle catégorie</Text>

            {/* Nom de la catégorie */}
            <TextInput
                style={styles.input}
                placeholder="Nom de la catégorie"
                value={inputCategory}
                onChangeText={setInputCategory}
            />

            {/* Color Picker */}
            <View style={styles.pickerWrapper}>
                <ColorPicker
                    color={inputColor}
                    onColorChange={setInputColor}
                    thumbSize={30}
                    sliderSize={40}
                    gapSize={20}
                    noSnap={true}
                    row={false}
                    shadeSliderThumb={true}
                />
            </View>

            <Text style={styles.textError}>{textError}</Text>

            {/* Boutons Valider */}
            <TouchableOpacity
                style={[styles.button, { backgroundColor: inputColor }]}
                onPress={handleAddCategory}
            >
                <Text
                    style={[
                        styles.buttonText,
                        {
                            color: getContrastingTextColor(inputColor),
                        },
                    ]}
                >
                    Valider
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 32,
    },
    back: {
        padding: 10,
        paddingLeft: 0,
        marginVertical: 15,
    },
    title: {
        fontSize: theme.fontSizes.large,
        fontFamily: theme.fonts.comfortaaBold,
        textAlign: "center",
    },
    pickerWrapper: {
        height: 450,
        borderRadius: 12,
        marginBottom: 32,
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.icon_gray,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginTop: 16,
        fontFamily: theme.fonts.openSansRegular,
    },
    textError: {
        textAlign: "center",
        color: "red",
        marginBottom: 16,
        fontSize: theme.fontSizes.medium,
        fontFamily: theme.fonts.openSansSemiBold,
    },

    button: {
        alignSelf: "center",
        width: "50%",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    buttonText: {
        textAlign: "center",
        fontFamily: theme.fonts.openSansSemiBold,
    },
});
