import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import theme from "../core/theme";

export default function ModalFollow({ menuVisible, onClose, username }) {
    const navigation = useNavigation();

    const handlePress = () => {
        onClose();
        // navigation.navigate(screenName);
    };

    return (
        <Modal
            isVisible={menuVisible}
            onBackdropPress={onClose}
            animationIn="fadeInRight"
            animationOut="slideOutRight"
            style={styles.modal}
            backdropOpacity={0.4}
        >
            <View style={styles.menuContainer}>
                <Text style={styles.username}>{username}</Text>

                {/* Unfollow */}
                <View style={styles.buttonRow}>    
                    <TouchableOpacity
                        style={{
                            ...styles.btnOutline,
                            borderLeftWidth: 0.6,
                        }}
                        onPress={() => handlePress()}
                    >
                        <Text style={styles.textButton}>Ne plus suivre</Text>
                        <MaterialIcons
                            name="person-remove"
                            size={24}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>

                {/* Croix de fermeture */}
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <FontAwesome6 name="xmark" size={32} color={theme.colors.blue} />
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
        paddingTop: 65,
        paddingHorizontal: 40,
    },
    username: {
        fontFamily: theme.fonts.comfortaaBold,
        fontSize: theme.fontSizes.large,
        marginHorizontal: "auto",
    },
    buttonRow: {
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: theme.colors.icon_gray,
        overflow: "hidden",
        marginTop: 30,
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
        color: theme.colors.icon_dark,
    },
    closeButton: {
        marginHorizontal: "auto",
        marginVertical: 25,
    },
});