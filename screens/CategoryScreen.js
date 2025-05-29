import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../core/theme";
import Header2 from "../components/Header2";
import { useRoute } from "@react-navigation/native";
import ArticleCard from "../components/ArticleCard";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { getCategories } from "../constants/Urls";

export default function CategoryScreen({ navigation }) {
    const route = useRoute();
    const user = useSelector((state) => state.user.value);
    const isFocused = useIsFocused();
    const { categoryId, title, color, articles } = route.params;
    const [searchValue, setSearchValue] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        isFocused &&
            getCategories(user).then((res) => {
                const resultArticles = res.categoriesList.filter(
                    (item) => item._id === categoryId
                );
                setData(resultArticles[0].articles);
            });
    }, [isFocused, user]);
    const filteredData = data.filter(
        (item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.description.toLowerCase().includes(searchValue.toLowerCase())
    );

    const renderVeilleItem = ({ item }) => (
        <ArticleCard
            _id={item._id}
            title={item.title}
            description={item.description}
            image={item.media}
            category={title}
            categoryColor={color}
            defaultMedia={item.defaultMedia}
            date={item.date}
            url={item.url}
            author={item.author}
            isFavorite={user.favoriteArticles.includes(item._id)}
            showDate={true}
        />
    );

    return (
        // <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.container}>
            <Header2
                // voir commment gérer la modification via les 3 points de la catégorie avec categoryId, title et color
                colorText={color}
                onBack={() => navigation.goBack()}
                searchValue={searchValue}
                onChangeSearch={setSearchValue}
                title={title}
                routeName={route.name}
                categoryId={categoryId}
                categoryColor={color}
                token={user.token}
            />
            <View
                style={{
                    backgroundColor: theme.colors.bg_gray,
                    flex: 1,
                }}
            >
                <FlatList
                    data={filteredData}
                    renderItem={renderVeilleItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        paddingVertical: 12,
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
        </View>
        // {/* </SafeAreaView> */}
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.bg_White,
    },
});
