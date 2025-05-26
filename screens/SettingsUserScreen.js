import { View, Text, StyleSheet } from "react-native";
import theme from "../core/theme";
import Header from "../components/Header";

export default function AddCategoryScreen() {
    return (
        <View style={styles.container}>
            <Header title={"Paramètres utilisateur"} />
            <View
                style={{
                    backgroundColor: theme.colors.bg_gray,
                    height: "100%",
                }}
            >
                <Text style={styles.text}>Settings User Screen</Text>
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
