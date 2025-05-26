import { View, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../core/theme";
import Header from "../components/Header";
import Sections from "../components/Sections";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getCategories } from "../constants/Urls";

export default function CategoriesScreen() {
    const user = useSelector((state) => state.user.value);
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        getCategories(user).then((res) => setData(res.categoriesList));
    }, []);
    return (
        <View style={styles.container}>
            <Header
                title={"Mes catégories"}
                inputValue={searchValue}
                setInput={setSearchValue}
            />
            <Sections
                data={data}
                searchText={searchValue}
                screen={"category"}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.bg_White,
    },
});
