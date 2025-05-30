import { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import theme from "../core/theme";
import Header2 from "../components/Header2";
import { useRoute } from "@react-navigation/native";
import ArticleCard from "../components/ArticleCard";
import { useSelector } from "react-redux";

export default function OnePopularScreen({ navigation }) {
    const user = useSelector((state) => state.user.value);
    const route = useRoute();
    const { userId, username, articles } = route.params;
    const [searchValue, setSearchValue] = useState("");

    const filteredArticles = articles.filter(
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
            category={username}
            defaultMedia={item.defaultMedia}
            date={item.date}
            url={item.url}
            author={item.author}
            isFavorite={user.favoriteArticles.includes(item._id)}
            showDate={true}
        />
    );

    return (
        <View style={styles.container}>
            <Header2
                title={username}
                colorText={theme.colors.text_dark}
                onBack={() => navigation.goBack()}
                searchValue={searchValue}
                onChangeSearch={setSearchValue}
                routeName={route.name}
                followedUsername={username} //je garde ce nom car même props pour oneFollowScreen
                followedUserId={userId}
            />

            <View style={{ backgroundColor: theme.colors.bg_gray, flex: 1 }}>
                <FlatList
                    data={filteredArticles}
                    renderItem={renderVeilleItem}
                    keyExtractor={(item) => item._id || item.id}
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
