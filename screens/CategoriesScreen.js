import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../core/theme";
import Header from "../components/Header";
import ArticlesSection from "../components/ArticlesSection";
// fausse doonnée à remplacer par store redux
import { categories } from "../data";

export default function CategoriesScreen() {
    const renderSectionItem = ({ item }) => (
        <ArticlesSection articlesArray={item} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Mes catégories"} />
            <View
                style={{
                    backgroundColor: theme.colors.bg_gray,
                    height: "100%",
                }}
            >
                <FlatList
                    data={categories}
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
