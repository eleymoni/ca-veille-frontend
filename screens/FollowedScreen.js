import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../core/theme";
import Header from "../components/Header";
import { useState } from "react";

export default function FollowedScreen() {
    const [searchText, setSearchText] = useState("");
    return (
        <SafeAreaView style={styles.container}>
            <Header
                title={"Mes abonnements"}
                inputValue={searchText}
                setInput={setSearchText}
            />
            <View
                style={{
                    backgroundColor: theme.colors.bg_gray,
                    height: "100%",
                }}
            >
                <Text style={styles.text}>Categories Screen</Text>
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
