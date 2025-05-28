import { Text, TouchableOpacity, StyleSheet } from "react-native";

import theme from "../core/theme";

export default function DefaultButton({
    text,
    handlePress,
    align = "flex-start",
}) {
    return (
        <TouchableOpacity
            style={[styles.button, { alignSelf: align }]}
            onPress={handlePress}
        >
            <Text style={styles.label}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.blue,
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    label: {
        color: theme.colors.text_light,
        fontFamily: theme.fonts.comfortaaBold,
        textAlign: "center",
    },
});
