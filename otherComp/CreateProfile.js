import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Date from './Date';
import Header from './Header';

type props = {
  name?: string,
};

export default class CreateProfile extends React.Component {
  render() {
    return (
      <View> 
        <Header/>
      <View style={styles.profile}>
        <Text style={styles.title}>Create Profile</Text>
      <View style={styles.picture}>
        <Image source={{ uri: "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=170667a&w=0&h=hMQs-822xLWFz66z3Xfd8vPog333rNFHU6Q_kc9Sues=" }} style={{ width: 90, height: 90 }} />
      </View>
        <TextInput style={styles.textinput} placeholder="Username" underlineColorAndroid={'transparent'}/>
        <Date/>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    alignSelf: 'stretch',
    alignContent: 'center',
  },
  picture: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    alignText: 'center',
    fontSize: 20,
    paddingTop: 15,
    marginBottom: 15, 
  }, 
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 0,
    color: '#000000',
    borderBottomColor: '#003679',
    borderBottomWidth: 1,
  }
});