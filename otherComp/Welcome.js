import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import FlatButton from './buttons';
import Header from './Header';

export default function Welcome() {
  return (
    <View> 
      <Header/>
    <View style={styles.container}>
      <Text style={styles.paragraph}> Home </Text>
      <FlatButton text='Login to Gmail' onPress={() =>
  this.props.navigation.navigate('Submit', { name: this.state.name })}/>
      <View style={styles.space}/>

      <FlatButton text='Login to Twitter' onPress={() =>
  this.props.navigation.navigate('Submit', { name: this.state.name })}/>
      <View style={styles.space}/>

      <FlatButton text='Login to Facebook' onPress={() =>
  this.props.navigation.navigate('Submit', { name: this.state.name })}/>

      <Text style={styles.subscript}>
        *Disclaimer: BlueBuddy does not use or sell your personal information. 
      </Text>
      <Text style={styles.subscript}>
        © BlueBuddy, 2021 
      </Text>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    margin: 10
  },
  paragraph: {
    margin: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  space: {
    width: 15,
    height: 15,
  },
  subscript: {
    margin: 10,
    fontSize: 12,
    textAlign: 'left',
  }
});