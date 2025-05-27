import { View, FlatList, Text } from "react-native";
import theme from "../core/theme";
import ArticlesSection from "../components/ArticlesSection";

export default function Sections({ data, searchText, screen }) {
    const renderSectionItem = ({ item }) => (
        <ArticlesSection articlesArray={item} screen={screen} />
    );
    // filter the articles in category with the header input
    const filteredData = data?.map((cat) => {
        return {
            _id: cat._id,
            name: cat.name || cat.username,
            color: cat.color || theme.colors.text_dark,
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
    const dataWithArticle = filteredData?.filter(
        (cat) => cat.articles.length > 0
    );
    return (
        <View
            style={{
                backgroundColor: theme.colors.bg_gray,
                flex: 1,
            }}
        >
            <FlatList
                data={dataWithArticle}
                renderItem={renderSectionItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{
                    paddingLeft: 16,
                }}
                ListEmptyComponent={
                    <Text
                        style={{
                            textAlign: "center",
                            marginTop: 50,
                            color: theme.colors.text_dark,
                        }}
                    >
                        Aucun article trouvé.
                    </Text>
                }
            />
        </View>
    );
}
