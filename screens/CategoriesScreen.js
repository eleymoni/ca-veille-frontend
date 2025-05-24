import { View, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../core/theme";
import Header from "../components/Header";
import Sections from "../components/Sections";

import { useState, useEffect } from "react";
import { getCategories } from "../constants/Urls";

export default function CategoriesScreen() {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        getCategories("categoriesId", [
            "682dd7f1cff4700fb23cf77d",
            "682dd8b14263208c7bc4038f",
        ]).then((res) => setData(res.categoriesList));
    }, []);
    return (
        <View style={styles.container}>
            <Header
                title={"Mes catégories"}
                inputValue={searchText}
                setInput={setSearchText}
            />
            <Sections data={data} searchText={searchText} screen={"category"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.bg_White,
    },
});
