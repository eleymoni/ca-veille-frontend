import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";
import theme from "../core/theme";
import { Keyboard } from "react-native";
import truncate from "../utils/truncate";
import ModalFollow from "./ModalFollow";
import ModalUpdateCategory from "./ModalUpdateCategory";

const Header2 = ({
    title,
    colorText,
    onBack,
    routeName,
    searchValue,
    onChangeSearch,
    followedUsername,
    followedUserId,
    token,
    categoryId,
    categoryColor,
}) => {
    const [showModalFollow, setShowModalFollow] = useState(false);
    const [showModalCategory, setShowModalCategory] = useState(false);
    const displayTitle = truncate(title, 40);

    const handleClearSearch = () => {
        onChangeSearch("");
        Keyboard.dismiss();
    };

    const handleModalPress = () => {
        if (routeName === "OneFollowScreen") {
            setShowModalFollow(true);
        } else if (routeName === "Category") {
            setShowModalCategory(true);
        } else if (routeName === "OnePopular") {
            setShowModalFollow(true);
        }
    };

    // const handleSubmitSearch = () => {
    //     onSearch(searchValue);
    //     Keyboard.dismiss();
    // }

    return (
        <SafeAreaView style={styles.headerContainer} edges={["top"]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack}>
                    <FontAwesome5
                        name="arrow-left"
                        size={26}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <Text style={{ ...styles.title, color: colorText }}>
                    {displayTitle}
                </Text>
                <TouchableOpacity onPress={handleModalPress}>
                    <Entypo
                        name="dots-three-vertical"
                        size={26}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={28} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Rechercher..."
                        onChangeText={onChangeSearch}
                        value={searchValue}
                        // onSubmitEditing={handleSubmitSearch}
                        autoFocus={false}
                    />

                    {searchValue && ( //s'affiche que si j'ai tapé qq ch
                        <TouchableOpacity onPress={handleClearSearch}>
                            <Entypo
                                name="cross"
                                size={20}
                                color={theme.colors.text_gray}
                            />
                        </TouchableOpacity>
                    )}
                </View>
                <ModalFollow
                    menuVisible={showModalFollow}
                    onClose={() => setShowModalFollow(false)}
                    username={followedUsername}
                    followedUserId={followedUserId}
                    token={token}
                />
                <ModalUpdateCategory
                    menuVisible={showModalCategory}
                    onClose={() => setShowModalCategory(false)}
                    categoryId={categoryId}
                    categoryName={title}
                    categoryColor={categoryColor}
                    token={token}
                />
            </View>
        </SafeAreaView>
    );
};

export default Header2;

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 25,
        backgroundColor: theme.colors.bg_White,
        ...Platform.select({
            ios: {
                shadowColor: theme.colors.text_dark,
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
            },
            android: {
                elevation: 15,
            },
        }),
        zIndex: 2,
    },
    header: {
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
    searchBar: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 15,
        backgroundColor: theme.colors.bg_White,
        zIndex: 1,
        borderWidth: 1,
        borderColor: theme.colors.icon_gray,
        borderRadius: 30,
        paddingVertical: Platform.OS === "ios" ? 7 : 2,
        marginBottom: 15,
    },
    input: {
        color: theme.colors.text_dark,
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        fontFamily: theme.fonts.openSansRegular,
        fontSize: theme.fontSizes.medium,
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
                elevation: 15,
            },
            android: {
                elevation: 15,
            },
        }),
    },
});
