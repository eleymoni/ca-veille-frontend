import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, Image } from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import theme from "../core/theme";

const veilleData = [
  {
    id: '1',
    title: "L’intelligence artificielle en 2025",
    description: 'Les tendances IA à suivre absolument cette année.',
    category: 'Tech',
    date: '20 mai 2025',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Le retour des crypto-monnaies',
    description: 'Nouveau bull run? Analyse des signaux.',
    category: 'Finance',
    date: '19 mai 2025',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Accessibilité web',
    description: 'Bonnes pratiques pour rendre vos sites inclusifs.',
    category: 'Web',
    date: '17 mai 2025',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    isFavorite: false,
  }
]

const renderVeilleItem = ({item}) => (
  <View style={styles.card}>
    <FontAwesome5 name="star" size={22} style={styles.icon}/>
    <View style={styles.row}>
    <Image source={{uri : item.image}} style={styles.image}/>
      <View style={styles.textContainer}>
      <Text>{item.category}</Text>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.description}>{item.description}</Text>
    </View>
    </View>
  </View>
);

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={veilleData}
        renderItem={renderVeilleItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: theme.colors.bg_gray,
  },
  card: {
    backgroundColor: theme.colors.bg_White,
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#335561',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 3,
    position: 'relative',
    width: '100%'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginBottom: 12,
    marginRight: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: theme.fontSizes.medium,
    marginBottom: 2,
    color: theme.colors.text_dark,
  },
  description: {
    color: theme.colors.text_gray,
    fontSize: theme.fontSizes.small,
  },
  icon: {
    position: 'absolute',
    top: 12,
    right: 14,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});