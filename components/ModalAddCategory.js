import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Modal,
} from "react-native";
import ColorPicker from "react-native-wheel-color-picker";
import { getContrastingTextColor } from "../utils/InverseColorUtils";
import theme from "../core/theme";

export default function ModalAddCategory({ modalVisible, onClose, onCreate }) {
    const [inputCategory, setInputCategory] = useState("");
    const [inputColor, setInputColor] = useState(theme.colors.blue);
    const [textError, setTextError] = useState("");

    const handleClose = () => {
        setTextError("");
        setInputCategory("");
        setInputColor(theme.colors.blue);
        onClose();
    };

    const handleAddCategory = async () => {
        const trimmed = inputCategory.trim();
        if (!trimmed) return;

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
            onCreate({
                _id: data.category._id,
                name: data.category.name,
                color: data.category.color,
            });
            setTextError("");
            setInputCategory("");
            setInputColor(theme.colors.blue);
            onClose();
        }

        setTextError("Cette catégorie existe déjà");
    };

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <View style={styles.backdrop}>
                <View style={styles.content}>
                    <Text style={styles.title}>Nouvelle catégorie</Text>

                    {/* Color Picker */}
                    <View style={styles.pickerWrapper}>
                        <ColorPicker
                            color={inputColor}
                            onColorChange={setInputColor}
                            thumbSize={30}
                            sliderSize={30}
                            noSnap={true}
                            row={false}
                        />
                    </View>

                    {/* Nom de la catégorie */}
                    <TextInput
                        style={styles.input}
                        placeholder="Nom de la catégorie"
                        value={inputCategory}
                        onChangeText={setInputCategory}
                    />
                    <Text style={styles.textError}>{textError}</Text>
                    {/* Boutons Valider / Annuler */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelBtn]}
                            onPress={handleClose}
                        >
                            <Text style={styles.buttonText}>Annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                { backgroundColor: inputColor },
                            ]}
                            onPress={handleAddCategory}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    {
                                        color: getContrastingTextColor(
                                            inputColor
                                        ),
                                    },
                                ]}
                            >
                                Valider
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        padding: 16,
    },
    content: {
        backgroundColor: theme.colors.bg_White,
        borderRadius: 16,
        padding: 20,
    },
    title: {
        fontSize: theme.fontSizes.large,
        fontFamily: theme.fonts.comfortaaBold,
        marginBottom: 12,
        textAlign: "center",
    },
    pickerWrapper: {
        height: 250,
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.icon_gray,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        fontFamily: theme.fonts.openSansRegular,
    },
    textError: {
        alignSelf: "flex-end",
        color: "red",
        marginBottom: 16,
        fontFamily: theme.fonts.openSansRegular,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginLeft: 12,
    },
    cancelBtn: {
        backgroundColor: theme.colors.bg_gray,
    },
    buttonText: {
        fontFamily: theme.fonts.openSansSemiBold,
    },
});
