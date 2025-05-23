import { View, Text, StyleSheet, Image } from "react-native";
import theme from "../core/theme";
import truncate from "../utils/truncate";

export default function ArticleSmallCard({ article }) {
    const source = article.media || article.defaultMedia;
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{truncate(article.title, 27)}</Text>
            <Image
                source={{ uri: source }}
                style={{
                    ...styles.image,
                    resizeMode: article.media ? "cover" : "contain",
                }}
            />
        </View>
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
        zIndex: 1,
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
