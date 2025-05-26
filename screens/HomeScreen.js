import { View, Text, StyleSheet, FlatList } from "react-native";
import theme from "../core/theme";
import Header from "../components/Header";
import ArticleCard from "../components/ArticleCard";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { GetHomeCategories } from "../constants/Urls";

export default function HomeScreen() {
    const user = useSelector((state) => state.user.value);

    const [searchValue, setSearchValue] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        GetHomeCategories(user).then((res) => setData(res.articles));
    }, []);

    const filteredArticles = data?.filter(
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
            category={item.categoryName}
            username={item.username}
            categoryColor={item.categoryColor}
            sectionId={item.categoryId || item.userId}
            defaultMedia={item.defaultMedia}
            date={item.date}
            url={item.url}
            author={item.author}
            //il faut faire la logique de comparé l'id de l'article aux ids stockés dans le reducers
            isFavorite={item.isFavorite}
            showDate={false}
        />
    );
    return (
        <View style={styles.container}>
            <Header inputValue={searchValue} setInput={setSearchValue} />
            <View
                style={{
                    backgroundColor: theme.colors.bg_gray,
                    height: "100%",
                }}
            >
                {filteredArticles?.length === 0 ? (
                    <Text style={{ textAlign: "center", marginTop: 50 }}>
                        Aucun article !
                    </Text>
                ) : (
                    <FlatList
                        data={filteredArticles}
                        renderItem={renderVeilleItem}
                        keyExtractor={(item) => item._id}
                        contentContainerStyle={{
                            paddingHorizontal: 16,
                            paddingVertical: 12,
                        }}
                    />
                )}
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
