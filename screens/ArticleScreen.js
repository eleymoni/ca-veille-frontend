import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../core/theme";
import Header from "../components/Header";
import { useRoute } from "@react-navigation/native";

export default function ArticleScreen() {
    const route = useRoute();
    // articlesId is the id of the all the articles of the category sort by date
    const { categoryId, categoryName, categoryColor, value } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <Header title={value.title} />
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
                    titre de la categorie : {categoryName}
                </Text>
                <Text style={styles.text}>
                    couleur de la catégorie : {categoryColor}
                </Text>
                <Text style={styles.text}>
                    titre de l'article : {value.title}
                </Text>
                <Text style={styles.text}>id de l'article : {value._id}</Text>
                <Text style={styles.text}>
                    date de l'article :{" "}
                    {new Date(value.date).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </Text>
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
