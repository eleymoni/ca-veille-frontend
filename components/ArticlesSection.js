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

export default function ArticlesSection({ articlesArray: categoryObj }) {
    const navigation = useNavigation();
    const handleCategoryPress = () => {
        // element to sends :
        // category id => articlesArray._id
        const articlesId = categoryObj.articles.map((item) => item._id);
        navigation.navigate("Category", {
            categoryId: categoryObj._id,
            title: categoryObj.name,
            color: categoryObj.color,
            articlesId: articlesId,
        });
    };
    const handleArticlePress = (value) => {
        // element to sends :
        // category id, title category, color category. check for the others value to send
        navigation.navigate("Article", {
            categoryId: categoryObj._id,
            title: value.title,
            category: categoryObj.name,
            color: categoryObj.color,
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
                        color: categoryObj.color,
                    }}
                >
                    {truncate(categoryObj.name, 29) + " ›"}
                </Text>
            </TouchableOpacity>
            <FlatList
                data={categoryObj.articles}
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
