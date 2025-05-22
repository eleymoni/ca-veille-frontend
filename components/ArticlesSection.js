import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from "react-native";
import theme from "../core/theme";
import ArticleSmallCard from "./ArticleSmallCard";
import { useNavigation } from "@react-navigation/native";
import truncate from "../utils/truncate";

export default function ArticlesSection({ articlesArray }) {
    const navigation = useNavigation();
    function getArticlesArray(array) {
        // get all articles from all feeds in a array sort by date
        const newArray = [];
        array.feeds.map((item) => {
            const defaultImage = item.defaultMedia;
            item.articles.map((article) =>
                newArray.push({ ...article, defaultImage })
            );
        });
        // Sort in descending order
        newArray.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });
        return newArray;
    }
    const articleSortDate = getArticlesArray(articlesArray);

    const handleCategoryPress = () => {
        // element to sends :
        // id => articlesArray._id
        // title = > articlesArray.name,
        // color => articlesArray.color
        // articles ID =s articlesId
        const articlesId = articleSortDate.map((item) => item._id);
        navigation.navigate("Category", {
            categoryId: articlesArray._id,
            title: articlesArray.name,
            color: articlesArray.color,
            articlesId: articlesId,
        });
    };

    const handleArticlePress = (value) => {
        // element to sends :
        // category id, title category, color category. check for the others value to send
        navigation.navigate("Article", {
            categoryId: articlesArray._id,
            title: value.title,
            category: articlesArray.name,
            color: articlesArray.color,
            articleId: value._id,
        });
    };

    const renderCardItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleArticlePress(item)}>
            <ArticleSmallCard article={item} />
        </TouchableOpacity>
    );
    return (
        <View
            style={{
                backgroundColor: theme.colors.bg_gray,
            }}
        >
            <TouchableOpacity onPress={() => handleCategoryPress()}>
                <Text
                    style={{
                        ...styles.sectionTitle,
                        color: articlesArray.color,
                    }}
                >
                    {truncate(articlesArray.name, 29) + " ›"}
                </Text>
            </TouchableOpacity>
            <FlatList
                data={articleSortDate}
                renderItem={renderCardItem}
                keyExtractor={(item) => item._id}
                horizontal={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        color: theme.colors.primary,
        fontSize: theme.fontSizes.xlarge,
        margin: 15,
        fontFamily: theme.fonts.openSansSemiBold,
    },
});
