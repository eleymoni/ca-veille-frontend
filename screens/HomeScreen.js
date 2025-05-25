import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import theme from "../core/theme";
import Header from "../components/Header";
import ArticleCard from "../components/ArticleCard";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addUser } from "../reducers/user";

const veilleData = [
    {
        id: "1",
        title: "L’intelligence artificielle en 2025",
        description: "Les tendances IA à suivre absolument cette année.",
        category: "Tech",
        color: "green",
        date: "2025-09-17T00:00:00.000Z",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
        isFavorite: true,
    },
    {
        id: "2",
        title: "Test titre mega looooooooooooooooooooooooong Le retour des crypto-monnaies",
        description:
            "Test description plus longue Nouveau bull run? Analyse des signaux.",
        category: "Finance",
        color: "blue",
        date: "2025-07-17T00:00:00.000Z",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        isFavorite: false,
    },
    {
        id: "3",
        title: "Accessibilité web",
        description: "Bonnes pratiques pour rendre vos sites inclusifs.",
        category: "Web",
        color: "red",
        date: "2025-05-17T00:00:00.000Z",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        isFavorite: false,
    },
];

const renderVeilleItem = ({ item }) => (
    <ArticleCard
        title={item.title}
        description={item.description}
        image={item.image}
        category={item.category}
        categoryColor={item.color}
        isFavorite={item.isFavorite}
        // showDate={true}
        // date={item.date}
    />
);

export default function HomeScreen() {
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    useEffect(() => {
        dispatch(
            addUser({
                username: "pierre",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmRiZDExNzg2MTIyOTdiOTU4N2NlNSIsImlhdCI6MTc0NzgzMjkwOSwiZXhwIjoxNzQ5MDQyNTA5fQ.v7_Ogjn0vViA8TjgZoNYGQFrHxqwR27BJUlrDEandn8",
                categories: [
                    "682dd7f1cff4700fb23cf77d",
                    "682dd8b14263208c7bc4038f",
                ],
                followedUser: ["683094dce8c3f9bf00a9c6f9"],
                articles: [
                    "68303c1dac0a986ebc1bd383",
                    "68303c1dac0a986ebc1bd385",
                ],
                isPublic: true,
            })
        );
    }, []);
    return (
        <View style={styles.container}>
            <Header inputValue={searchText} setInput={setSearchText} />
            <View
                style={{
                    backgroundColor: theme.colors.bg_gray,
                    height: "100%",
                }}
            >
                <FlatList
                    data={veilleData}
                    renderItem={renderVeilleItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        paddingVertical: 12,
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
