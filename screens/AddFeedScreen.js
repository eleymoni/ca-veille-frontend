import { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import { createFeed, getCategories } from "../constants/Urls";
import ModalAddCategory from "../components/ModalAddCategory";
import NavigationBackArrow from "../components/NavigationBackArrow";
import theme from "../core/theme";

export default function AddFeedScreen() {
    const user = useSelector((state) => state.user.value);
    // récupération des catégories
    const [categories, setCategories] = useState(user.categories || []);

    // inputs
    const [inputUrl, setInputUrl] = useState("");
    const [selectedCategory, setSelectedCategory] = useState({
        id: null,
        name: "",
    });

    const [isFeedCreated, setIsfeedCreated] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await getCategories(user);
                const cats = user.categories.map((id, i) => ({
                    _id: id,
                    name: res.categoriesList[i].name,
                    color: res.categoriesList[i].color,
                }));
                setCategories(cats);
            } catch (e) {
                console.error("Failed to load categories", e);
            }
        };
        loadCategories();
    }, [user.token, user.categories]);

    const handleAddFeed = async () => {
        if (inputUrl && selectedCategory) {
            const data = await createFeed(
                inputUrl,
                selectedCategory.id,
                user.token
            );
            if (data.result) {
                setSelectedCategory({
                    id: null,
                    name: "",
                });
                setInputUrl("");
                setIsfeedCreated(
                    `Le feed ${inputUrl} a été ajouté dans la catégorie ${selectedCategory.name}`
                );
            }
        }
    };

    const handleCreateCategory = (Inputcategory) => {
        setCategories((prev) => [...prev, Inputcategory]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <NavigationBackArrow />
            <Text style={styles.label}>Entrer l'URL du site web</Text>
            <TextInput
                style={styles.input}
                placeholder="ex. https://lesnumeriques.com"
                value={inputUrl}
                onChangeText={setInputUrl}
                autoCapitalize="none"
                keyboardType="url"
            />
            {categories.length !== 0 && (
                <>
                    <Text style={[styles.label, { marginTop: 30 }]}>
                        Dans quelle catégorie souhaiter vous l'ajouter ?
                    </Text>
                    <ScrollView
                        style={styles.catList}
                        contentContainerStyle={{ paddingVertical: 4 }}
                        showsVerticalScrollIndicator
                    >
                        {(categories ?? [])
                            .filter((cat) => typeof cat === "object" && cat._id)
                            .map((category) => (
                                <TouchableOpacity
                                    key={category._id}
                                    style={[
                                        styles.catItem,
                                        selectedCategory.name ===
                                            category.name &&
                                            styles.catItemSelected,
                                    ]}
                                    onPress={() =>
                                        setSelectedCategory({
                                            id: category._id,
                                            name: category.name,
                                        })
                                    }
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        {/* Pastille couleur */}
                                        <View
                                            style={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: 6,
                                                backgroundColor:
                                                    category.color ||
                                                    theme.colors.icon_gray,
                                                marginRight: 8,
                                            }}
                                        />
                                        <Text
                                            style={[
                                                styles.catText,
                                                selectedCategory.name ===
                                                    category.name &&
                                                    styles.catTextSelected,
                                            ]}
                                        >
                                            {category.name}
                                        </Text>
                                    </View>
                                    {selectedCategory.name ===
                                        category.name && (
                                        <FontAwesome6
                                            name="check"
                                            size={16}
                                            color={"green"}
                                        />
                                    )}
                                </TouchableOpacity>
                            ))}
                    </ScrollView>
                </>
            )}
            {/* Bouton pour ouvrir la modal */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => setIsModalVisible(true)}
            >
                <Text style={styles.buttonText}>+ Ajouter une catégorie</Text>
            </TouchableOpacity>
            <ModalAddCategory
                modalVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onCreate={handleCreateCategory}
                token={user.token}
            />
            <Text style={{ marginTop: 30, color: "green" }}>
                {isFeedCreated}
            </Text>
            <TouchableOpacity
                style={{ ...styles.button, marginTop: 30 }}
                onPress={handleAddFeed}
            >
                <Text style={styles.buttonText}>Ajouter le feed</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.bg_White,
        paddingHorizontal: 32,
    },
    label: {
        fontFamily: theme.fonts.openSansRegular,
        fontSize: theme.fontSizes.medium,
        marginBottom: 8,
        color: theme.colors.text_dark,
    },
    feedInfo: {
        fontFamily: theme.fonts.openSansRegular,
        fontSize: theme.fontSizes.small,
        marginTop: 32,
        color: theme.colors.blue,
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.icon_gray,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontFamily: theme.fonts.openSansRegular,
    },
    button: {
        marginTop: 12,
        alignSelf: "center",
        borderWidth: 1,
        borderColor: theme.colors.blue,
        borderRadius: 8,
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    buttonText: {
        fontFamily: theme.fonts.openSansRegular,
        fontSize: theme.fontSizes.medium,
        color: theme.colors.blue,
    },
    disabledButtonText: {
        fontFamily: theme.fonts.openSansRegular,
        fontSize: theme.fontSizes.medium,
        color: theme.colors.icon_gray,
    },
    catList: {
        maxHeight: 200,
        borderWidth: 1,
        borderColor: theme.colors.icon_gray,
        borderRadius: 8,
        marginTop: 8,
    },
    catItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.icon_gray,
    },
    catItemSelected: {
        backgroundColor: theme.colors.bg_light,
        paddingHorizontal: 20,
    },
    catText: {
        width: "90%",
        fontFamily: theme.fonts.openSansRegular,
        fontSize: theme.fontSizes.medium,
    },
    catTextSelected: {
        color: theme.colors.primary,
    },
});
