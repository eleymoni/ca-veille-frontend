import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import theme from "../core/theme";
import { deleteFollowedUser, addFollowedUser } from "../constants/Urls";
import { useDispatch, useSelector } from "react-redux";
import { unfollowUser, followUser } from "../reducers/user";

export default function ModalFollow({
    menuVisible,
    onClose,
    username,
    followedUserId,
    token,
}) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const followedUser = useSelector((state) => state.user.value.followedUsers);
    const isFollowed = followedUser.includes(followedUserId);

    const handleUnfollowPress = async () => {
        Alert.alert(
            "Confirmation",
            `Voulez-vous vraiment ne plus suivre ${username} ?`,
            [
                {
                    text: "Annuler",
                },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: async () => {
                        const res = await deleteFollowedUser(
                            followedUserId,
                            token
                        );

                        if (res.result) {
                            dispatch(unfollowUser({ userId: followedUserId }));
                            onClose();
                            navigation.goBack();
                        } else {
                            alert(
                                "Erreur lors de la suppression de l'abonnement"
                            );
                        }
                    },
                },
            ]
        );
    };

    const handleFollowPress = async () => {
        const res = await addFollowedUser(followedUserId, token);

        if (res.result) {
            dispatch(followUser({ userId: followedUserId }));
            onClose();
        } else {
            alert("Erreur lors de l'ajout de l'abonnement");
        }
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
                <Text style={styles.username}>{username}</Text>

                <View style={styles.buttonRow}>
                    {isFollowed ? (
                        <TouchableOpacity
                            style={{
                                ...styles.btnOutline,
                                borderLeftWidth: 0.6,
                            }}
                            onPress={() => handleUnfollowPress()}
                        >
                            <Text style={styles.textButton}>
                                Ne plus suivre
                            </Text>
                            <MaterialIcons
                                name="person-remove"
                                size={24}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={{
                                ...styles.btnOutline,
                                borderLeftWidth: 0.6,
                            }}
                            onPress={() => handleFollowPress()}
                        >
                            <Text style={styles.textButton}>Suivre</Text>
                            <MaterialIcons
                                name="person-add"
                                size={24}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Croix de fermeture */}
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <FontAwesome6
                        name="xmark"
                        size={32}
                        color={theme.colors.blue}
                    />
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
