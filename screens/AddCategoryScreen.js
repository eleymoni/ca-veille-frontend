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

export default function AddCategoryScreen() {
    const navigation = useNavigation();
    const [inputCategory, setInputCategory] = useState("");
    const [inputColor, setInputColor] = useState(theme.colors.blue);
    const [textError, setTextError] = useState("");

    const handleAddCategory = async () => {
        const trimmed = inputCategory.trim();
        if (!trimmed) return setTextError("Rentrer un nom à la catégorie");

        const response = await fetch(
            "http://192.168.1.150:3000/categories/newCategory",
            {
                method: "POST",
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmRiZDExNzg2MTIyOTdiOTU4N2NlNSIsImlhdCI6MTc0NzgzMjkwOSwiZXhwIjoxNzQ5MDQyNTA5fQ.v7_Ogjn0vViA8TjgZoNYGQFrHxqwR27BJUlrDEandn8",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: trimmed,
                    color: inputColor,
                }),
            }
        );
        const data = await response.json();

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
