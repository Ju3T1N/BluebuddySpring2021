import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
    <Text style={styles.title}>Bluebuddy</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 35,
    backgroundColor: '#003679'
  }, 
  title: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'normal',
  }
});