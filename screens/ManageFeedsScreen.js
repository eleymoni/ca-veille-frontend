import { View, Text, StyleSheet } from "react-native";
import theme from "../core/theme";
import Header from "../components/Header";

export default function ManageFeedsScreen() {
    return (
        <View style={styles.container}>
            <Header title={"Gérer les feeds"} />
            <View
                style={{
                    backgroundColor: theme.colors.bg_gray,
                    height: "100%",
                }}
            >
                <Text style={styles.text}>Manage Feeds Screen</Text>
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
