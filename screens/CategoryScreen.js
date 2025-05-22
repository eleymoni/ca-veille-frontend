import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../core/theme";
import Header2 from "../components/Header2";
import { useRoute } from "@react-navigation/native";
import ArticleCard from "../components/ArticleCard";

export default function CategoryScreen({navigation}) {
    const route = useRoute();

    const { categoryId, title, color, articlesId } = route.params;

    const [searchValue, setSearchValue] = useState("");

    const [veilleData, setVeilleData] = useState(
    [
        {
            id: "1",
            title: "L’intelligence artificielle en 2025",
            description: "Les tendances IA à suivre absolument cette année.",
            category: "Tech",
            date: "2025-09-17T00:00:00.000Z",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
            isFavorite: true,
        },
        {
            id: "2",
            title: "Test titre mega looooooooooooooooooooooooong Le retour des crypto-monnaies",
            description: "Test description plus longue Nouveau bull run? Analyse des signaux.",
            category: "Finance",
            date: "2025-07-17T00:00:00.000Z",
            image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
            isFavorite: false,
        },
        {
            id: "3",
            title: "Accessibilité web",
            description: "Bonnes pratiques pour rendre vos sites inclusifs.",
            category: "Web",
            date: "2025-05-17T00:00:00.000Z",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
            isFavorite: false,
        },
    ]);

    const filteredData = veilleData.filter(item => 
        item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.description.toLowerCase().includes(searchValue.toLowerCase())
    );

    const renderVeilleItem = ({ item }) => (
        <ArticleCard
            title={item.title}
            description={item.description}
            image={item.image}
            // category={item.category} sert que dans la home ?
            isFavorite={item.isFavorite}
            showDate={true}
            date={item.date}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header2 title={title} colorText={color} onBack={() => navigation.goBack()} searchValue={searchValue} onChangeSearch={setSearchValue} />
            <View
                style={{
                    backgroundColor: theme.colors.bg_gray,
                    height: "100%",
                }}
            >
                <FlatList
                    data={filteredData}
                    renderItem={renderVeilleItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                    }}
                    ListEmptyComponent={
                        <Text style={{ textAlign: "center", marginTop: 50, color: theme.colors.text_dark }}>
                            Aucun article trouvé.
                        </Text>
                    }
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.bg_White,
    },
});
