import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

type props = {
  name?: string,
};

export default function FlatButton( { text, onPress }) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{ text }</Text>
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#003679'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
});