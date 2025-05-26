import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../core/theme";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getFavoritesArticles } from "../constants/Urls";
import ArticleCard from "../components/ArticleCard";

export default function FavorisScreen() {
    const user = useSelector((state) => state.user.value);
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        getFavoritesArticles(user).then((res) => setData(res.articles));
    }, []);

    const filteredData = data?.filter(
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
            // category={title}
            // categoryColor={color}
            defaultMedia={item.defaultMedia}
            date={item.date}
            url={item.url}
            author={item.author}
            //il faut faire la logique de comparé l'id de l'article aux ids stockés dans le reducers
            isFavorite={item.isFavorite}
            showDate={true}
        />
    );

    return (
        <View style={styles.container}>
            <Header
                title={"Mes articles favoris"}
                inputValue={searchValue}
                setInput={setSearchValue}
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.bg_White,
    },
});
