import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import theme from "../core/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteArticle } from "../constants/Urls";
import { toggleFavorite } from "../reducers/user";

const Header3 = ({ articleId, title, onBack }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const favorite = user.favoriteArticles.includes(articleId);
    const maxLength = 55;
    const displayTitle =
        title?.length > maxLength
            ? title.substring(0, maxLength) + "..."
            : title;

    const handleFavorite = () => {
        toggleFavoriteArticle(articleId, user.token).then(
            (res) => res.result && dispatch(toggleFavorite({ articleId }))
        );
    };

    return (
        <SafeAreaView style={styles.headerContainer} edges={["top"]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack}>
                    <FontAwesome5
                        name="arrow-left"
                        size={26}
                        color={theme.colors.text_gray}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>{displayTitle}</Text>

                <TouchableOpacity onPress={handleFavorite}>
                    <FontAwesome5
                        name="star"
                        size={24}
                        solid={favorite}
                        color={favorite ? theme.colors.blue : theme.colors.blue}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Header3;

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
