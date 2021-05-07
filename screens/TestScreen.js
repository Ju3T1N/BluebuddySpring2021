import React,{useState, useEffect, useLayoutEffect} from "react";
import { Text, KeyboardAvoidingView, View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import {Button, Input, Image,Avatar} from 'react-native-elements';
import CustomListItem from "../components/CustomListItem";
import {auth, db} from "../firebase";
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons";



const TestScreen = ({navigation}) => {

  const [chats, setChats] = useState([]);

 

  useEffect(()=> {
    const unsubribe = db.collection('chats').onSnapshot(snapshot => (
      setChats(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    ));

    return unsubribe;

  },[])    //gets all the chats from this user from firebase 

  useLayoutEffect(()=> {
    navigation.setOptions({
      title: "BlueBuddy",
      headerStyle: {backgroundColor:"white"},
      headerTitleStyle: {color: "black"},
      headerTintColor:"black",
       headerRight: () => (
        <View style={{flexDirection: "row",justifyContent:"space-between", width:80,marginRight:20,}}>
          <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
             <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
          
        </View>
      
      )


    });
  }, []);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    })
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
          {chats.map(({id,data: {chatName}})=> (
             <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>

          ))}
      
       
      </ScrollView>
    </SafeAreaView>
  )
}

export default TestScreen

const styles = StyleSheet.create({
  container: {
    height:'100%',
  }
})