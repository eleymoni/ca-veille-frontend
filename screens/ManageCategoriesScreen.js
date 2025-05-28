import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ScrollView,
    FlatList,
    Modal,
} from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import NavigationBackArrow from "../components/NavigationBackArrow";
import DefaultButton from "../components/DefaultButton";
import theme from "../core/theme";
import ModalModifyCategory from "../components/ModalModifyCategory";
import { getCategories, updateCategory } from "../constants/Urls";

export default function ManageCategoriesScreen() {
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [nameCliked, setNameClicked] = useState("");
    const [colorCliked, setColorCliked] = useState("");
    const [idClicked, setIdClicked] = useState("");
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    useEffect(() => {
        getCategories(user).then((res) =>
            setData(
                res.categoriesList.map((item) => {
                    return {
                        name: item.name,
                        color: item.color,
                        _id: item._id,
                    };
                })
            )
        );
    }, []);

    const handleCategoriesUpdate = (itemColor, itemName, itemId) => {
        let valid = false;
        const updated = data.map(async (item) => {
            if (item._id === itemId) {
                await updateCategory(
                    itemName,
                    itemColor,
                    itemId,
                    user.token
                ).then((res) => (valid = res.result));
                return {
                    ...item,
                    name: itemName,
                    color: itemColor,
                };
            }
            return item;
        });
        valid && setData(updated);
    };

    const renderCategory = ({ item }) => {
        return (
            <View style={[styles.itemList]}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setNameClicked(
                                (prevItem) => (prevItem = item.name)
                            );
                            setColorCliked(
                                (prevItem) => (prevItem = item.color)
                            );
                            setIdClicked((prevItem) => (prevItem = item._id));
                            setIsModalVisible((prevItem) => (prevItem = true));
                        }}
                    >
                        <Text
                            style={[
                                styles.itemText,
                                { color: item.color || theme.colors.text_dark },
                            ]}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <TouchableOpacity>
                            <FontAwesome6
                                name="trash"
                                size={18}
                                color={theme.colors.icon_red}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <FontAwesome6
                                name="gear"
                                size={18}
                                color={theme.colors.icon_gray}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <NavigationBackArrow />
            <Text style={styles.title}>Gérer vos catégories</Text>
            <ModalModifyCategory
                modalName={"Modifier la catégorie"}
                sectionName={nameCliked}
                sectionColor={colorCliked}
                sectionId={idClicked}
                modalVisible={isModalVisible}
                onValidation={handleCategoriesUpdate}
                onClose={() => setIsModalVisible(false)}
                // onCreate={handleCreateCategory}
                token={user.token}
            />

            <FlatList
                data={data}
                renderItem={renderCategory}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.bg_White,
        paddingHorizontal: 32,
    },
    title: {
        fontSize: theme.fontSizes.large,
        fontFamily: theme.fonts.comfortaaBold,
        color: theme.colors.text_dark,
        textAlign: "center",
    },

    itemList: {
        maxHeight: 250,
        borderWidth: 1,
        borderColor: theme.colors.icon_gray,
        borderRadius: 8,
        marginTop: 10,
        padding: 10,
    },
    itemText: {
        fontFamily: theme.fonts.openSansSemiBold,
        fontSize: theme.fontSizes.medium,
    },
    iconButton: {
        marginLeft: 25,
        // padding: 6,
    },
});
