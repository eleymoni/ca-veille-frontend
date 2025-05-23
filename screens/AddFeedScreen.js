import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import theme from "../core/theme";
import { categories as allCategories } from "../data";
import ModalAddCategory from "../components/ModalAddCategory";

export default function AddFeedScreen() {
    const navigation = useNavigation();
    // récupération des catégories
    const [categories, setCategories] = useState(allCategories);
    // inputs
    const [inputUrl, setInputUrl] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const [urlFind, setUrlFind] = useState({ result: false, url: "" });
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSearch = async () => {
        // const response = await fetch("http://localhost:3000/feeds/create", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //         url: inputUrl,
        //     }),
        // });
        // const data = response.json;

        // if (data.response) {
        //     return setUrlFind(data.url);
        // }

        setUrlFind({
            result: true,
            url: "https://www.lesnumeriques.com/rss.xml",
        });
    };

    const handleCreateCategory = (Inputcategory) => {
        setCategories((prev) => [...prev, Inputcategory]);
    };

    const handleAddFeed = () => {
        // Valider inputUrl et selectedCategory avant d’envoyer
        console.log("Ajout du feed", inputUrl, "dans", selectedCategory);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Retour */}
            <TouchableOpacity
                style={styles.back}
                onPress={() => navigation.goBack()}
            >
                <Ionicons
                    name="arrow-back"
                    size={28}
                    color={theme.colors.text}
                />
            </TouchableOpacity>
            <Text style={styles.label}>Entrer l'URL du site web</Text>
            <TextInput
                style={styles.input}
                placeholder="ex. lesnumeriques.com"
                value={inputUrl}
                onChangeText={setInputUrl}
                autoCapitalize="none"
                keyboardType="inputUrl"
            />
            <TouchableOpacity style={styles.button} onPress={handleSearch}>
                <Text style={styles.buttonText}>Rechercher</Text>
            </TouchableOpacity>
            {urlFind.result && (
                <Text style={styles.feedInfo}>
                    Vous allez ajouter ce feed :{"\n"}
                    {urlFind.url}
                </Text>
            )}
            <Text style={[styles.label, { marginTop: 30 }]}>
                Dans quelle catégorie souhaiter vous l'ajouter ?
            </Text>
            <ScrollView
                style={styles.catList}
                contentContainerStyle={{ paddingVertical: 4 }}
                showsVerticalScrollIndicator
            >
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.name}
                        style={[
                            styles.catItem,
                            selectedCategory.name === category.name &&
                                styles.catItemSelected,
                        ]}
                        onPress={() => setSelectedCategory(category.name)}
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
                                    selectedCategory.name === category.name &&
                                        styles.catTextSelected,
                                ]}
                            >
                                {category.name}
                            </Text>
                        </View>
                        {selectedCategory === category.name && (
                            <FontAwesome
                                name="check"
                                size={16}
                                color={theme.colors.primary}
                            />
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
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
            />
            <TouchableOpacity
                style={[
                    !urlFind.result ? styles.disabledButton : styles.button,
                    { marginTop: 60 },
                ]}
                onPress={handleAddFeed}
                disabled={!urlFind.result}
            >
                <Text
                    style={
                        !urlFind.result
                            ? styles.disabledButtonText
                            : styles.buttonText
                    }
                >
                    Ajouter le feed
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    back: {
        marginTop: 10,
        marginBottom: 20,
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
    disabledButton: {
        marginTop: 12,
        alignSelf: "center",
        borderWidth: 1,
        borderColor: theme.colors.icon_gray,
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
    },
    catText: {
        fontFamily: theme.fonts.openSansRegular,
        fontSize: theme.fontSizes.medium,
    },
    catTextSelected: {
        color: theme.colors.primary,
    },
});
