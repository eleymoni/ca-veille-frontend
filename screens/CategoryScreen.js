import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../core/theme";
import Header from "../components/Header";
import { useRoute } from "@react-navigation/native";

export default function FollowedScreen() {
    const route = useRoute();
    // articlesId is the id of the all the articles of the category sort by date
    const { categoryId, title, color, articlesId } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <Header title={title} colorText={color} />
            <View
                style={{
                    backgroundColor: theme.colors.bg_gray,
                    height: "100%",
                }}
            >
                <Text style={styles.text}>Category 1 Screen</Text>
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
