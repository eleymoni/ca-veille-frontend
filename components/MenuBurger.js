import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import Modal from "react-native-modal";
import theme from "../core/theme";

export default function MenuBurger({ menuVisible, onClose }) {
    const navigation = useNavigation();

    const handlePress = (screenName) => {
        onClose();
        navigation.navigate(screenName);
    };

    return (
        <Modal
            isVisible={menuVisible}
            onBackdropPress={onClose}
            animationIn="fadeInDown"
            animationOut="slideOutUp"
            style={styles.modal}
            backdropOpacity={0.4}
        >
            <View style={styles.menuContainer}>
                <Image
                    style={styles.logo}
                    source={require("../assets/icon.png")}
                />

                {/* Feeds */}
                <View style={styles.section}>
                    <Text style={styles.textLink}>Feeds</Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={{
                                ...styles.btnOutline,
                                borderRightWidth: 0.6,
                            }}
                            onPress={() => handlePress("AddFeedScreen")}
                        >
                            <Text style={styles.textButton}>Ajouter</Text>
                            <FontAwesome6
                                name="plus"
                                size={12}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                ...styles.btnOutline,
                                borderLeftWidth: 0.6,
                            }}
                            onPress={() => handlePress("ManageFeedsScreen")}
                        >
                            <Text style={styles.textButton}>Gérer</Text>
                            <FontAwesome6
                                name="gear"
                                size={12}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Catégories */}
                <View style={styles.section}>
                    <Text style={styles.textLink}>Catégories</Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={{
                                ...styles.btnOutline,
                                borderRightWidth: 0.6,
                            }}
                            onPress={() => handlePress("AddCategoryScreen")}
                        >
                            <Text style={styles.textButton}>Ajouter</Text>
                            <FontAwesome6
                                name="plus"
                                size={12}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                ...styles.btnOutline,
                                borderLeftWidth: 0.6,
                            }}
                            onPress={() =>
                                handlePress("ManageCategoriesScreen")
                            }
                        >
                            <Text style={styles.textButton}>Gérer</Text>
                            <FontAwesome6
                                name="gear"
                                size={12}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* paramètre du compte */}
                <TouchableOpacity
                    style={styles.link}
                    onPress={() => handlePress("SettingsUserScreen")}
                >
                    <Text style={styles.textLink}>paramètre du compte</Text>
                </TouchableOpacity>

                {/* paramètre de l'application */}
                <TouchableOpacity
                    style={styles.link}
                    onPress={() => handlePress("SettingsAppScreen")}
                >
                    <Text style={styles.textLink}>
                        paramètre de l'application
                    </Text>
                </TouchableOpacity>

                {/* Croix de fermeture */}
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <FontAwesome6 name="xmark" size={32} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: "flex-start",
        margin: 0,
    },
    menuContainer: {
        backgroundColor: theme.colors.bg_White,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        paddingTop: 20,
        paddingHorizontal: 40,
    },
    logo: {
        width: 80,
        height: 80,
        marginHorizontal: "auto",
    },
    section: {
        marginBottom: 30,
    },
    textLink: {
        fontFamily: theme.fonts.openSansRegular,
        fontSize: theme.fontSizes.medium,
        marginBottom: 8,
    },
    buttonRow: {
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: theme.colors.icon_gray,
        overflow: "hidden",
    },
    btnOutline: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        paddingVertical: 10,
        borderColor: theme.colors.icon_gray,
    },
    textButton: {
        fontFamily: theme.fonts.openSansRegular,
    },
    link: {
        paddingVertical: 12,
    },
    icon: {
        color: theme.colors.icon_gray,
    },
    closeButton: {
        marginHorizontal: "auto",
        marginVertical: 20,
    },
});
