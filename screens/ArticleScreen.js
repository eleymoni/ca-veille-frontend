import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../core/theme";
import Header from "../components/Header";
import { useRoute } from "@react-navigation/native";

export default function ArticleScreen() {
    const route = useRoute();
    // articlesId is the id of the all the articles of the category sort by date
    const {
        categoryId,
        category,
        title,
        color,
        articleId,
        articleUrl,
        ArticleDescription,
        articleMedia,
        aritcleDate,
        articleAuthor,
    } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <Header title={title} />
            <View
                style={{
                    backgroundColor: theme.colors.bg_gray,
                    height: "100%",
                }}
            >
                <Text style={styles.text}>
                    id de la categorie : {categoryId}
                </Text>
                <Text style={styles.text}>
                    titre de la categorie : {category}
                </Text>
                <Text style={styles.text}>
                    couleur de la catégorie : {color}
                </Text>
                <Text style={styles.text}>titre de l'article : {title}</Text>
                <Text style={styles.text}>id de l'article : {articleId}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.bg_White,
    },
});
