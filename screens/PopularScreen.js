import { View, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../core/theme";
import Header from "../components/Header";
import Sections from "../components/Sections";
import { useState, useEffect } from "react";
import { getPopulars } from "../constants/Urls";

export default function PopularScreen() {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");
    useEffect(() => {
        getPopulars("populars").then((res) => setData(res.users));
    }, []);
    return (
        <View style={styles.container}>
            <Header
                title={"Populaire"}
                inputValue={searchText}
                setInput={setSearchText}
            />
            <Sections data={data} searchText={searchText} screen={"popular"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.bg_White,
    },
});
