import React,{useState, useEffect, useLayoutEffect} from "react";
import { Text, KeyboardAvoidingView, View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Platform,TextInput, Keyboard, TouchableWithoutFeedback,Alert } from 'react-native';
import {Button, Input, Image,Avatar} from 'react-native-elements';
import CustomListItem from "../components/CustomListItem";

import {AntDesign, SimpleLineIcons} from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import {FontAwesome,Ionicons} from "@expo/vector-icons";
import {StatusBar} from "expo-status-bar";
import * as firebase from "firebase";
import {auth, db} from "../firebase";



const ChatScreen = ({navigation, route}) => {
  const[input,setInput] = useState("");

  const [messages,setMessages] = useState([])

  

  useLayoutEffect(() => {
    navigation.setOptions({
      title:'Chat',
      headerTitleAlign:"left",
      headerBackTitleVisible: false,
      headerTitle: () => (
        <View  style= {{flexDirection: "row", alignItems: "center",}}>
          <Avatar rounded source={{uri: messages[0]?.data.photoURL ||  "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",}}/>
          <Text style={{color: "white", marginLeft:10, fontWeight: "700"}}> {route.params.chatName} </Text>
        </View>
      ),
      headerRight: () => (
        <View
         style={{flexDirection:"row",justifyContent: "space-between", width: 80, marginRight: 20,}}>
          <TouchableOpacity>
              <FontAwesome name ="video-camera" size={24} color="white"/>
          </TouchableOpacity>
          <TouchableOpacity>
              <Ionicons  name ="call" size={24} color="white"/>
          </TouchableOpacity>

        </View>
      )

    })
  },[navigation, messages])

  const sendMessage = () => {
    Keyboard.dismiss();

    db.collection('chats').doc(route.params.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    })

    setInput("")


  };

  useLayoutEffect (() => {
    const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages').orderBy('timestamp', 'desc').onSnapshot( (snapshot) => setMessages(
      snapshot.docs.map(doc => ({ 
        id: doc.id,
        data: doc.data()
      }))
    ))

    return unsubscribe;

  },[route])



  return (
    <SafeAreaView style={styles.container} > 
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.key} keyboardVerticalOffset={90}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
          
            <ScrollView contentContainerStyle={{paddingTop:15}}>
                {messages.map(({id, data}) => 
                  data.email === auth.currentUser.email ?  (
                    <View key={id} style={styles.reciever}>
                        <Avatar position="absolute" rounded  bottom={-15} right={-5} size={30} source={{ uri: data.photoURL}} 
                        //WEB 
                        containerStyle={{position:"absolute", bottom:-15, right:-5}}/>
                        <Text style={styles.recieverText}>{data.message}</Text>
                    </View>

                  ):(
                    <View key={id} style={styles.sender}>
                         <Avatar position="absolute" rounded  bottom={-15} right={-5} size={30} source={{ uri: data.photoURL}} 
                        //WEB 
                        containerStyle={{position:"absolute", bottom:-15, right:-5}}/>
                        <Text style={styles.senderText}>{data.message}</Text>
                        <Text style={styles.senderName}>{data.displayName}</Text>
                    </View>
                  ),

                )}
            </ScrollView>
            <View style={styles.footer}>
                <TextInput  
                  value={input} 
                  onChangeText={(text) => setInput(text)} 
                  onSubmitEditing={sendMessage} 
                  placeholder="Signal Message" 
                  style={styles.textInput}
                  />
                <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                  <Ionicons  name ="send" size={24} color="#2B68E6"/>
                </TouchableOpacity>
            </View>
          </>
          
          </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
    flex: 1,
  },
  key:{
    flex:1,
  },
  footer:{
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput:{
      bottom: 0,
      height:40,
      flex:1,
      marginRight:15,
      borderColor: "transparent",
      backgroundColor:"#ECECEC",
      borderWidth: 1,
      padding:10,
      color:"grey",
      borderRadius:30,
  },
  reciever:{
    alignSelf: "flex-end",
      marginRight:15,
      marginBottom:20,
      backgroundColor:"#ECECEC",
      borderRadius:20,
      maxWidth:"80%",
      position:"relative",
      padding: 15,
    


  },
  sender: {
    alignSelf: "flex-start",
      margin:15,
      backgroundColor:"#2B68E6",
      borderRadius:20,
      maxWidth:"80%",
      position:"relative",
      padding: 15,

  },
  senderName: {
    left:10,
    paddingRight:10,
    fontSize:10,
    color: "white"
  },
  senderText:
  {
      color: "white",
      fontWeight:"500",
      marginLeft:10,
      marginBottom:15,
  },
  recieverText:
  {
    color: "black",
      fontWeight:"500",
      marginLeft:10,
  }

});