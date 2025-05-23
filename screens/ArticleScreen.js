import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../core/theme";
import Header from "../components/Header";
import { useRoute } from "@react-navigation/native";
import { FontAwesome5, Entypo, Ionicons, FontAwesome } from "@expo/vector-icons";

export default function ArticleScreen() {
    const route = useRoute();
    // articlesId is the id of the all the articles of the category sort by date
    const { categoryId, categoryName, categoryColor, value } = route.params;

    const isFavorite = value.isFavorite || false;

    return (
        <View style={styles.container}>
            <Header title={value.title} />
            <View
                style={{
                    backgroundColor: theme.colors.bg_gray,
                    height: "100%",
                }}
            >
                <View style={styles.card}>
                <View style={styles.topRow}>
                    <Text style={[styles.category, {color: categoryColor}]}>{categoryName}</Text>
                    <TouchableOpacity style={styles.linkBtn} onPress={() => {Linking.canOpenURL(value.url)}}>
                    <Text style={[styles.textLink, {color:categoryColor}]}>Lien vers l'article</Text>
                    <FontAwesome5 name="link" size={24} color={categoryColor} />
                    </TouchableOpacity>
                </View>

                {value.media && (
                    <Image source={{uri: value.media}} style={styles.image} />
                )}

                <Text style={styles.date}>
                    date de l'article :{" "}
                    {new Date(value.date).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}</Text>
                <Text style={styles.articleTitle}>{value.title}</Text>
                <Text style={styles.articleDesc}>{value.description}</Text>
            </View>

            <TouchableOpacity style={styles.similar}>
                <Text style={styles.similarText}>Voir des articles similaires</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.bg_White,
    },
    card: {
        backgroundColor: theme.colors.bg_White,
        borderRadius: 18,
        padding: 18,
        marginHorizontal: 12,
        marginVertical: 24,
        height: "60%",
        width: "95%",
        shadowColor: theme.colors.text_dark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10
    },
    category: {
        fontSize: theme.fontSizes.small,
        fontFamily: theme.fonts.openSansSemiBold,
    },
    linkBtn: {
        flexDirection: "row",
    },
    image: {
        width: "100%",
        height: 80,
        borderRadius: 10,
    },
    articleTitle: {
        fontFamily: theme.fonts.openSansSemiBold,
        fontSize: theme.fontSizes.medium, 
        color: theme.colors.text_dark,
    },
    articleDesc: {
        fontSize: theme.fontSizes.small,
        fontFamily: theme.fonts.openSansRegular,
        color: theme.colors.text_dark,
    },
    similar: {
        backgroundColor: theme.colors.bg_White,
        borderRadius: 18,
        shadowColor: theme.colors.text_dark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
        padding: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    similarText: {
        fontSize: theme.fontSizes.small,
        fontFamily: theme.fonts.openSansRegular,
        color: theme.colors.text_dark,
    }
});
