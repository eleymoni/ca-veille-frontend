import { View, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../core/theme";
import Header from "../components/Header";
import Sections from "../components/Sections";
import { useState, useEffect } from "react";
import { getPopulars } from "../constants/Urls";
import { useDispatch, useSelector } from "react-redux";

export default function PopularScreen() {
    const token = useSelector((state) => state.user.value.token);
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        getPopulars(token).then((res) => setData(res.users));
    }, []);
    return (
        <View style={styles.container}>
            <Header
                title={"Populaire"}
                inputValue={searchValue}
                setInput={setSearchValue}
            />
            <Sections data={data} searchText={searchValue} screen={"popular"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.bg_White,
    },
});
