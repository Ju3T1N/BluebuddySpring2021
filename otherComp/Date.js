import React, { Component } from 'react';
import { StyleSheet, View, Text, Picker, TouchableOpacity } from 'react-native';

type props = {
  name?: string,
};

export default class Date extends Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>
          Date of Birth
        </Text>
        <Picker style={styles.dropdown}>
          <Picker.Item label="Month"></Picker.Item>
          <Picker.Item label="Jan"></Picker.Item>
          <Picker.Item label="Feb"></Picker.Item>
          <Picker.Item label="Mar"></Picker.Item>
          <Picker.Item label="Apr"></Picker.Item>
          <Picker.Item label="May"></Picker.Item>
          <Picker.Item label="June"></Picker.Item>
          <Picker.Item label="July"></Picker.Item>
          <Picker.Item label="Aug"></Picker.Item>
          <Picker.Item label="Sept"></Picker.Item>
          <Picker.Item label="Oct"></Picker.Item>
          <Picker.Item label="Nov"></Picker.Item>
          <Picker.Item label="Dec"></Picker.Item>
        </Picker>
        <View style={styles.space}/>
        <Picker style={styles.dropdown}>
          <Picker.Item label="Date"></Picker.Item>
          <Picker.Item label="1"></Picker.Item>
          <Picker.Item label="2"></Picker.Item>
          <Picker.Item label="3"></Picker.Item>
          <Picker.Item label="4"></Picker.Item>
          <Picker.Item label="5"></Picker.Item>
          <Picker.Item label="6"></Picker.Item>
          <Picker.Item label="7"></Picker.Item>
          <Picker.Item label="8"></Picker.Item>
          <Picker.Item label="9"></Picker.Item>
          <Picker.Item label="10"></Picker.Item>
          <Picker.Item label="11"></Picker.Item>
          <Picker.Item label="12"></Picker.Item>
          <Picker.Item label="13"></Picker.Item>
          <Picker.Item label="14"></Picker.Item>
          <Picker.Item label="15"></Picker.Item>
          <Picker.Item label="16"></Picker.Item>
          <Picker.Item label="17"></Picker.Item>
          <Picker.Item label="18"></Picker.Item>
          <Picker.Item label="19"></Picker.Item>
          <Picker.Item label="20"></Picker.Item>
          <Picker.Item label="21"></Picker.Item>
          <Picker.Item label="22"></Picker.Item>
          <Picker.Item label="23"></Picker.Item>
          <Picker.Item label="24"></Picker.Item>
          <Picker.Item label="25"></Picker.Item>
          <Picker.Item label="26"></Picker.Item>
          <Picker.Item label="27"></Picker.Item>
          <Picker.Item label="28"></Picker.Item>
          <Picker.Item label="29"></Picker.Item>
          <Picker.Item label="30"></Picker.Item>
          <Picker.Item label="31"></Picker.Item>
        </Picker>
        <View style={styles.space}/>
        <Picker style={styles.dropdown}>
          <Picker.Item label="Year"></Picker.Item>
          <Picker.Item label="1990"></Picker.Item>
          <Picker.Item label="1991"></Picker.Item>
          <Picker.Item label="1992"></Picker.Item>
          <Picker.Item label="1993"></Picker.Item>
          <Picker.Item label="1994"></Picker.Item>
          <Picker.Item label="1995"></Picker.Item>
          <Picker.Item label="1996"></Picker.Item>
          <Picker.Item label="1997"></Picker.Item>
          <Picker.Item label="1998"></Picker.Item>
          <Picker.Item label="1999"></Picker.Item>
          <Picker.Item label="2000"></Picker.Item>
          <Picker.Item label="2001"></Picker.Item>
          <Picker.Item label="2002"></Picker.Item>
          <Picker.Item label="2003"></Picker.Item>
        </Picker>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btntext}>Register</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dropdown: {
    padding: 5,
    width: 90,
  },
  title: {
    alignSelf: 'stretch',
    height: 10,
    marginBottom: 30,
    color: '#000000',
    fontSize: 16,
  },
  space: {
    width: 15,
    height: 15,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#003679',
    marginTop: 30,
  },
  btntext: {
    color: '#fff',
  }

});