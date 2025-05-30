import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    TextInput,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../core/theme";
import { Keyboard } from "react-native";
import MenuBurger from "./MenuBurger";
import truncate from "../utils/truncate";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = ({
    title,
    colorText = theme.colors.text_dark,
    inputValue,
    setInput,
}) => {
    const [showMenuBurger, setShowMenuBurger] = useState(false);
    // search bar state
    const [showSearch, setShowSearch] = useState(false);
    // if the title length is too long, maxLength is the max length of the title

    title = truncate(title, 40);

    const toggleSearch = () => {
        // switch to search on header on click of search icon
        setShowSearch((prev) => !prev);
        setInput("");
        Keyboard.dismiss();
    };

    const handleMenuPress = () => {
        setShowMenuBurger(true);
    };

    return (
        <SafeAreaView style={styles.headerContainer} edges={["top"]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleMenuPress}>
                    <Ionicons style={styles.icon} name="menu" size={28} />
                </TouchableOpacity>
                {/* if the props title is empty show the logo */}
                {title && !showSearch ? (
                    <Text style={{ ...styles.title, color: colorText }}>
                        {title}
                    </Text>
                ) : !showSearch ? (
                    <Image
                        style={{ width: 180, height: 60 }}
                        resizeMode="contain"
                        source={require("../assets/images/logo_light_mode.png")}
                    />
                ) : (
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={28} style={styles.icon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Rechercher..."
                            onChangeText={setInput}
                            value={inputValue}
                            autoFocus={true}
                        />
                        <TouchableOpacity
                            onPress={toggleSearch}
                            style={styles.closeButton}
                        >
                            <Ionicons
                                name="close"
                                size={24}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                )}
                {!showSearch && (
                    <TouchableOpacity onPress={toggleSearch}>
                        <Ionicons name="search" size={28} style={styles.icon} />
                    </TouchableOpacity>
                )}
                <MenuBurger
                    menuVisible={showMenuBurger}
                    onClose={() => setShowMenuBurger(false)}
                />
            </View>
        </SafeAreaView>
    );
};

export default Header;

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
    searchContainer: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: theme.colors.bg_White,
        zIndex: 1,
        borderWidth: 1,
        borderColor: theme.colors.icon_gray,
        borderRadius: 30,
    },
    searchInput: {
        color: theme.colors.text_dark,
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        fontFamily: theme.fonts.openSansRegular,
        fontSize: theme.fontSizes.medium,
    },
    closeButton: {
        marginLeft: 10,
    },
    header: {
        height: 80,
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
