import React,{useState, useLayoutEffect} from "react";
import { Text, KeyboardAvoidingView, View, StyleSheet } from 'react-native';
import {Button, Input, Image} from 'react-native-elements';
import {StatusBar} from 'expo-status-bar';
import {auth,db} from '../firebase';

const RegisterScreen = ({navigation}) =>{
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [imageUrl,setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });

  }, [navigation])
  
	const genUser = async () => {
		await db 
		.collection("users")
		.doc(auth.currentUser.uid)
		.set({
			name: name,
		})
	};
  const register =()=> {
    auth.createUserWithEmailAndPassword (email,password)
    .then((authUser) => {
      authUser.user.updateProfile({
        displayName: name,
        photoURL: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
      }
	)
	.then(genUser)
    })
    .catch((error) => alert(error.message));
  };
  return(

    <KeyboardAvoidingView behavior="padding" style= {styles.container} keyboardVerticalOffset={-120}>
    <StatusBar style="light" />
      <Text h3 style={{marginBottom:50}}>
      Create a Bluebuddy Account
      </Text>

       <View style={styles.inputContainer}>
       <Input placeholder="Full Name"  autoFocus type='text' value={name} onChangeText={(text)=> setName(text)} />
       <Input placeholder="Email"  autoFocus type='text' value={email} onChangeText={(text)=> setEmail(text)} />
       <Input placeholder="Password"  secureTextEntry autoFocus type='text' value={password} onChangeText={(text)=> setPassword(text)} />
       

       </View>

       <Button raised containerStyle={styles.button} onPress={register} title="Register" />
    </KeyboardAvoidingView>
   
   );
   
  
};

export default RegisterScreen;

const styles= StyleSheet.create({
  container:{
    flex:1,
    alignItems: "center",
    justifyContent:"center",
    padding: 10,
    backgroundColor: "white",

  },
  inputContainer:{
    width:300,
  },
  button: {
    width:200,
    marginTop:10,
  },
});