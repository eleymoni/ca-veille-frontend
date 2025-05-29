// import { View, Text, StyleSheet, Image } from "react-native";
// import theme from "../core/theme";
// import truncate from "../utils/truncate";

// export default function ArticleSmallCard({ article }) {
//     const source = article.media || article.defaultMedia;
//     return (
//         <View style={styles.card}>
//             <Text style={styles.title}>{truncate(article.title, 27)}</Text>
//             <Image
//                 source={{ uri: source }}
//                 style={{
//                     ...styles.image,
//                     resizeMode: article.media ? "cover" : "contain",
//                 }}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     card: {
//         width: 150,
//         height: 180,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: theme.colors.bg_White,
//         borderRadius: 12,
//         padding: 8,
//         marginRight: 20,
//         zIndex: 1,
//         shadowColor: theme.colors.text_dark,
//         shadowOffset: { width: 0, height: 20 },
//         shadowOpacity: 0.1,
//         shadowRadius: 15,
//         elevation: 3,
//         marginBottom: 5,
//     },
//     title: {
//         color: theme.colors.text_dark,
//         fontSize: theme.fontSizes.small,
//         textAlign: "center",
//         fontFamily: theme.fonts.openSansSemiBold,
//         marginBottom: 15,
//     },
//     image: {
//         width: 130,
//         height: 100,
//         borderRadius: 12,
//     },
// });

import { View, Text, StyleSheet, Image, Platform } from "react-native";
import theme from "../core/theme";
import truncate from "../utils/truncate";

export default function ArticleSmallCard({ article }) {
    const source = article.media || article.defaultMedia;
    return (
        <View
  style={{
    borderRadius: 40,
    backgroundColor: theme.colors.bg_White,
    // Ombres pour iOS ET Android
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.text_dark,
        shadowOffset: { width: 5, height: 20 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
    marginRight: 20,
    marginBottom: 6,
  }}
>
  <View
    style={{
      borderRadius: 12,
      overflow: "hidden", 
      width: 150,
      height: 180,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.bg_White,
      padding: 8,
      // plus d’ombre ici
    }}
  >

            <Text style={styles.title}>{truncate(article.title, 27)}</Text>
            <Image
                source={{ uri: source }}
                style={{
                    ...styles.image,
                    resizeMode: article.media ? "cover" : "contain",
                }}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        color: theme.colors.text_dark,
        fontSize: theme.fontSizes.small,
        textAlign: "center",
        fontFamily: theme.fonts.openSansSemiBold,
        marginBottom: 15,
    },
    image: {
        width: 130,
        height: 100,
        borderRadius: 12,
    },
});
