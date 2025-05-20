import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function RegisterScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Register Screen</Text>
      <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('TabNavigator')}
            >
              <Text style={styles.buttonText}>Aller à l'accueil</Text>
            </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});