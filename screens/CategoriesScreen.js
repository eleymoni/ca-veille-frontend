import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../core/theme";
import Header from "../components/Header";
import ArticlesSection from "../components/ArticlesSection";
// fausse doonnée à remplacer par store redux
import { categories } from "../data";
import { useState } from "react";

export default function CategoriesScreen() {
    const [data, setData] = useState(categories);
    const renderSectionItem = ({ item }) => (
        <ArticlesSection articlesArray={item} />
    );
    //function reverse dataflow for header search
    function searchRange(value) {
        // const test = data.map((item) => {
        //     item.feeds.map((feed) =>
        //         feed.articles.filter((article) => article.title.includes(value))
        //     );
        // });
        console.log(value);
    }
    const filteredData = data.filter((item) => item.feeds.length > 0);
    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Mes catégories"} searchRange={searchRange} />
            <View
                style={{
                    backgroundColor: theme.colors.bg_gray,
                    height: "100%",
                }}
            >
                <FlatList
                    data={filteredData}
                    renderItem={renderSectionItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={{
                        paddingLeft: 16,
                    }}
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
