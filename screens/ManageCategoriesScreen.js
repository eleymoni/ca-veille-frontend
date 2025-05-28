import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationBackArrow from "../components/NavigationBackArrow";
import theme from "../core/theme";

export default function ManageCategoriesScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <NavigationBackArrow />
            <Text>ManageCategoriesScreen</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.bg_White,
        paddingHorizontal: 32,
    },
});
