import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import theme from "../core/theme";

function truncate(text, maxLength) {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength -1) + "..." : text;
}

export default function ArticleCard({
    title, 
    description, 
    image, 
    category,
    isFavorite
}) {

    const MAX_TITLE_LENGTH = 70;
    const MAX_DESCRIPTION_LENGTH = 90;

    const isTitleTooLong = title.length > MAX_TITLE_LENGTH;

    return (
        <View style={styles.card}>
            <FontAwesome5
            name="star"
            size={22}
            solid={isFavorite}
            color={isFavorite ? theme.colors.blue : theme.colors.blue}
            style={styles.icon}
            />
            <View style={styles.row}>
                <Image source={{ uri: image }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.category}>{category}</Text>
                    <Text style={styles.title}>{truncate(title, MAX_TITLE_LENGTH)}</Text>
                    {!isTitleTooLong && description && (
                        <Text style={styles.description}>
                            {truncate(description, MAX_DESCRIPTION_LENGTH)}
                        </Text>
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.bg_White,
        borderRadius: 18,
        padding: 16,
        marginBottom: 24,
        shadowColor: theme.colors.text_dark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
        position: "relative",
        width: "100%",
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 12,
        marginBottom: 12,
        marginRight: 12,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    title: {
        fontSize: theme.fontSizes.medium,
        marginBottom: 2,
        color: theme.colors.text_dark,
        fontFamily: theme.fonts.openSansRegular
    },
    category: {
        color: theme.colors.primary,
        fontSize: theme.fontSizes.small,
        marginBottom: 4,
        fontFamily: theme.fonts.openSansRegular
    },
    description: {
        color: theme.colors.text_gray,
        fontSize: theme.fontSizes.small,
        fontFamily: theme.fonts.openSansRegular
    },
    icon: {
        position: "absolute",
        top: 12,
        right: 14,
    },
    textContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
});