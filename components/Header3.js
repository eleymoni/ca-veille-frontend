import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    TextInput,
} from "react-native";
import { FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";
import theme from "../core/theme";

const Header3 = ({
    title,  
    onBack,
    isFavorite,
    onToggleFavorite
}) => {

    const maxLength = 55;
    const displayTitle =
        title?.length > maxLength
            ? title.substring(0, maxLength) + "..."
            : title;

    return (
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onBack}>
                        <FontAwesome5 name="arrow-left" size={26} style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        {displayTitle}
                    </Text>

                    <TouchableOpacity onPress={onToggleFavorite}>
                    <FontAwesome5
                        name="star"
                        size={24}
                        solid={isFavorite}
                        color={isFavorite ? theme.colors.blue : theme.colors.icon_gray}
                        style={styles.icon}
                    />
                    </TouchableOpacity>
                </View>
            <View style={styles.shadow} />
             
            </View>
     );
};

export default Header3;

const styles = StyleSheet.create({
    header: {
        height: 80,
        paddingHorizontal: 25,
        backgroundColor: theme.colors.bg_White,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 2,
    },
    title: {
        fontSize: theme.fontSizes.large,
        fontFamily: theme.fonts.comfortaaBold,
        width: "75%",
        textAlign: "center",
    },
    icon: {
        color: theme.colors.icon_gray,
    },
    shadow: {
        backgroundColor: theme.colors.bg_gray,
        width: "100%",
        height: 1,
        zIndex: 1,
        ...Platform.select({
            ios: {
                shadowColor: theme.colors.text_dark,
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
            },
            android: {
                elevation: 15,
            },
        }),
    },
});