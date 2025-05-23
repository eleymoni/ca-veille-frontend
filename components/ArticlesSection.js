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

export default function ArticlesSection({ articlesArray: categoryObj, screen }) {
    const navigation = useNavigation();

    const handleCategoryPress = () => {
        // element to sends :
        // category id => articlesArray._id

        if (screen === "category") {
            const articlesId = categoryObj.articles.map((item) => item._id);
            navigation.navigate("Category", {
                categoryId: categoryObj._id,
                title: categoryObj.name,
                color: categoryObj.color,
                articlesId: articlesId,
            });

        } else if (screen === "followed") {
            navigation.navigate("OneFollowScreen", {
                userId: categoryObj._id,
                username: categoryObj.name,
                articles: categoryObj.articles,
            });
        }
    };

    const handleArticlePress = (value) => {
        // element to sends :
        // category id, title category, color category. check for the others value to send
        // value.date = value.date.toString();
        navigation.navigate("Article", {
            categoryId: categoryObj._id,
            categoryName: categoryObj.name,
            categoryColor: categoryObj.color,
            value :{
                ...value, 
                date: value.date ? value.date.toString() : undefined,
            },
        });
    };

    const renderCardItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleArticlePress(item)}>
            <ArticleSmallCard article={item} />
        </TouchableOpacity>
    );

    const renderSectionTitle = () => (
        <TouchableOpacity onPress={() => handleCategoryPress()}>
                <Text
                    style={{
                        ...styles.sectionTitle,
                        color: screen === "category" ? categoryObj.color : theme.colors.dark,
                    }}
                >
                    {truncate(categoryObj.name, 29) + " ›"}
                </Text>
            </TouchableOpacity>
    );

    return (
        <View
            style={{
                backgroundColor: theme.colors.bg_gray,
            }}
        >
            {renderSectionTitle()}
            <FlatList
                data={categoryObj.articles}
                renderItem={renderCardItem}
                keyExtractor={(item) => item._id || item.id}
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
