import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../core/theme";
import Header3 from "../components/Header3";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import truncate from "../utils/truncate";
import { useSelector } from "react-redux";

export default function ArticleScreen() {
    //Attention : nouvelle méthode react native : Linking (voir doc)
    const navigation = useNavigation();
    const route = useRoute();
    const user = useSelector((state) => state.user.value);
    // articlesId is the id of the all the articles of the category sort by date
    const {
        articleId,
        title,
        description,
        sectionName,
        categoryColor,
        media,
        defaultMedia,
        date,
        url,
        author,
        isFavorite,
    } = route.params;
    // const isFavorite = value.isFavorite || false;

    const truncatedCategoryName = truncate(sectionName, 40);
    return (
        <View style={styles.container}>
            <Header3
                onBack={() => navigation.goBack()}
                isFavorite={isFavorite}
                articleId={articleId}
            />
            <View
                style={{
                    backgroundColor: theme.colors.bg_gray,
                    height: "100%",
                }}
            >
                <View style={styles.card}>
                    <View style={styles.topRow}>
                        <Text
                            style={[styles.category, { color: categoryColor }]}
                        >
                            {truncatedCategoryName}
                        </Text>
                        <TouchableOpacity
                            style={styles.linkBtn}
                            onPress={() => {
                                Linking.openURL(url);
                            }}
                        >
                            <Text
                                style={[
                                    styles.textLink,
                                    { color: categoryColor },
                                ]}
                            >
                                Lien vers l'article
                            </Text>
                            <FontAwesome5
                                name="link"
                                size={24}
                                color={categoryColor}
                            />
                        </TouchableOpacity>
                    </View>

                    {(media || defaultMedia) && (
                        <Image
                            source={{ uri: media || defaultMedia }}
                            style={{
                                ...styles.image,
                                resizeMode: media ? "cover" : "contain",
                            }}
                        />
                    )}

                    <Text style={styles.date}>
                        date de l'article :{" "}
                        {new Date(date).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </Text>
                    <Text style={styles.articleTitle}>{title}</Text>
                    <Text style={styles.articleDesc}>{description}</Text>
                </View>

                {/* <TouchableOpacity style={styles.similar}>
                <Text style={styles.similarText}>Voir des articles similaires</Text>
            </TouchableOpacity>  A voir à la fin si on laisse */}
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
        marginHorizontal: 10,
        marginVertical: 25,
        height: "70%",
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
        marginVertical: 10,
    },
    category: {
        fontSize: theme.fontSizes.medium,
        fontFamily: theme.fonts.openSansSemiBold,
        width: "50%",
    },
    linkBtn: {
        flexDirection: "row",
    },
    textLink: {
        marginRight: 8,
        fontFamily: theme.fonts.openSansRegular,
        fontSize: theme.fontSizes.medium,
        color: theme.colors.text_dark,
    },
    image: {
        width: "100%",
        height: 150,
        borderRadius: 10,
        marginBottom: 20,
    },
    date: {
        fontSize: theme.fontSizes.small,
        fontFamily: theme.fonts.openSansRegular,
        color: theme.colors.text_dark,
        marginVertical: 5,
    },
    articleTitle: {
        fontFamily: theme.fonts.openSansSemiBold,
        fontSize: theme.fontSizes.large,
        color: theme.colors.text_dark,
        marginVertical: 5,
    },
    articleDesc: {
        fontSize: theme.fontSizes.small,
        fontFamily: theme.fonts.openSansRegular,
        color: theme.colors.text_dark,
        marginVertical: 5,
    },
    // similar: {
    //     backgroundColor: theme.colors.bg_White,
    //     borderRadius: 18,
    //     shadowColor: theme.colors.text_dark,
    //     shadowOffset: { width: 0, height: 4 },
    //     shadowOpacity: 0.1,
    //     shadowRadius: 10,
    //     elevation: 3,
    //     padding: 18,
    //     justifyContent: "center",
    //     alignItems: "center",
    // },
    // similarText: {
    //     fontSize: theme.fontSizes.small,
    //     fontFamily: theme.fonts.openSansRegular,
    //     color: theme.colors.text_dark,
    // }
});
