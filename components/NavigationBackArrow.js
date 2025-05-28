import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import theme from "../core/theme";

export default function NavigationBackArrow() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}
        >
            <FontAwesome6
                name="arrow-left"
                size={28}
                color={theme.colors.icon_gray}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    back: {
        padding: 10,
        paddingLeft: 0,
        marginVertical: 15,
    },
});
