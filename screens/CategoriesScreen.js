import { View, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../core/theme";
import Header from "../components/Header";
import ArticlesSection from "../components/ArticlesSection";
import { useState, useEffect } from "react";
import { getCategories } from "../constants/Urls";

export default function CategoriesScreen() {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        getCategories("categoriesId", [
            "682dd7f1cff4700fb23cf77d",
            "682dd8b14263208c7bc4038f",
        ]).then((res) => setData(res.categoriesList));
    }, []);

    const renderSectionItem = ({ item }) => (
        <ArticlesSection articlesArray={item} screen="category" />
    );
    // filter the articles in category with the header input
    const filteredData = data.map((cat) => {
        return {
            _id: cat._id,
            name: cat.name,
            color: cat.color,
            articles: cat.articles.filter(
                (article) =>
                    article.title
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    article.description
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
            ),
        };
    });
    // check if the category has articles
    const dataWithArticle = filteredData.filter(
        (cat) => cat.articles.length > 0
    );
    return (
        <View style={styles.container}>
            <Header
                title={"Mes catégories"}
                inputValue={searchText}
                setInput={setSearchText}
            />
            <View
                style={{
                    backgroundColor: theme.colors.bg_gray,
                    height: "100%",
                }}
            >
                <FlatList
                    data={dataWithArticle}
                    renderItem={renderSectionItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={{
                        paddingLeft: 16,
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.bg_White,
    },
});
