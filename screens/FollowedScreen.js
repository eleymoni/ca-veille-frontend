import { View, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../core/theme";
import Header from "../components/Header";
import ArticlesSection from "../components/ArticlesSection";
import { useState } from "react";

export default function FollowedScreen() {

    const [followedUsers, setFollowedUsers] = useState([
        {
            _id: "john1",
            username: "John Doe",
            date: new Date("2025-05-01"),
            articles: [
                { id: "a1", title: "Lorem ipsum dolor", image: "https://cdn.lesnumeriques.com/optim/images/logo-LN-rss.png", description: "..." },
                { id: "a2", title: "Un autre article", image: "https://cdn.lesnumeriques.com/optim/images/logo-LN-rss.png", description: "..." },
            ]
        },
        {
            _id: "tom2",
            username: "Tom Tom",
            date: new Date("2025-05-01"),
            articles: [
                { id: "a3", title: "Titre", image: "https://cdn.lesnumeriques.com/optim/images/logo-LN-rss.png", description: "..." },
                { id: "a4", title: "Encore un", image: "https://cdn.lesnumeriques.com/optim/images/logo-LN-rss.png", description: "..." },
            ]
        },
        {
            _id: "tom3",
            username: "BLA BLA",
            date: new Date("2025-05-01"),
            articles: [
                { id: "a4", title: "blabla", image: "https://cdn.lesnumeriques.com/optim/images/logo-LN-rss.png", description: "..." },
                { id: "a5", title: "encoreblabl ", image: "https://cdn.lesnumeriques.com/optim/images/logo-LN-rss.png", description: "..." },
            ]
        },
    ]);

    const [searchText, setSearchText] = useState("");

    const filteredFollowedUsers = followedUsers
        .map(user => ({
            ...user,
            articles: user.articles.filter(article =>
                article.title.toLowerCase().includes(searchText.toLowerCase()) ||
                article.description.toLowerCase().includes(searchText.toLowerCase())
            )
        }))
        .filter(user => user.articles.length > 0);

    const renderUserSection = ({ item }) => {
        const fakeCategoryObj = {   //pas le choix sinon je peux pas reprendre ArticlesSection
            _id: item._id,
            name: item.username, 
            color: theme.colors.primary, 
            articles: item.articles,
        };
        return (
            <View style={styles.sectionContainer}>
                <ArticlesSection articlesArray={fakeCategoryObj} screen="followed"/>
            </View>
        );
    };
        
    return (
        <SafeAreaView style={styles.container}>
            <Header
                title={"Mes abonnements"}
                inputValue={searchText}
                setInput={setSearchText}
            />
            <View
                style={{
                    backgroundColor: theme.colors.bg_gray,
                    height: "100%",
                }}
            >
                        <FlatList
                            data={filteredFollowedUsers}
                            renderItem={renderUserSection}
                            keyExtractor={(item) => item._id}
                            contentContainerStyle={{
                                paddingLeft: 16,
                                paddingBottom: 24,
                                paddingTop: 8
                            }}
                        />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.bg_White,
    },
});
