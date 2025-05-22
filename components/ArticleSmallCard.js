import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import theme from "../core/theme";

function truncate(text, maxLength) {
    if (!text) return "";
    return text.length > maxLength
        ? text.substring(0, maxLength - 1) + "..."
        : text;
}

export default function ArticleSmallCard({ article }) {
    const maxTitleLength = 30;
    const source = article.media || article.defaultImage;
    return (
        <TouchableOpacity style={styles.card}>
            <Text style={styles.title}>
                {truncate(article.title, maxTitleLength)}
            </Text>
            <Image source={{ uri: source }} style={styles.image} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 150,
        height: 180,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.bg_White,
        borderRadius: 12,
        padding: 8,
        marginRight: 20,
    },
    title: {
        color: theme.colors.text_dark,
        fontSize: theme.fontSizes.small,
        textAlign: "center",
        fontFamily: theme.fonts.openSansSemiBold,
        marginBottom: 15,
    },
    image: {
        width: 130,
        height: 100,
        borderRadius: 12,
    },
});
