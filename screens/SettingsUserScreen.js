import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationBackArrow from "../components/NavigationBackArrow";
import theme from "../core/theme";
import DefaultButton from "../components/DefaultButton";
import { logout } from "../reducers/user";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function SettingsUserScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleDisconnect = () => {
        dispatch(logout());
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <NavigationBackArrow />
            <Text>SettingsUserScreen</Text>
            <DefaultButton
                text="Se déconnecter"
                handlePress={handleDisconnect}
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
});
