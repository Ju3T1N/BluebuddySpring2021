import React,{useState, useEffect, useLayoutEffect} from "react";
import { Text, KeyboardAvoidingView, View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import {Button, Input, Image,Avatar} from 'react-native-elements';
import CustomListItem from "../components/CustomListItem";
import {auth, db} from "../firebase";
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons";
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Header from '../otherComp/Header';
import Home from '../otherComp/Home';
import FriendsList from '../otherComp/FriendsList';

const HomeScreen = ({navigation}) => {

  const [chats, setChats] = useState([]);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");


    })
  }

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
      headerLeft: () => (
        <View style={{marginLeft:20}}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
          <Avatar rounded source={{uri:auth?.currentUser?.photoURL}}/>
          </TouchableOpacity>
        </View>
      
      ),
       headerRight: () => (
        <View style={{flexDirection: "row",justifyContent:"space-between", width:80,marginRight:20,}}>
  
          <TouchableOpacity onPress={() => navigation.navigate("Test")} activeOpacity={0.5}>
             <SimpleLineIcons name="people" size={24} color="black" />
          </TouchableOpacity>
        </View>
      
      )


    });
  }, []);
  
  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      chatName,
    })
  }
  async function onFriend(event,nid,name){
	const enterChat = (id, chatName) => {
			navigation.navigate("Chat", {
			id,
			chatName,
			})
		}
		query1=await db.collection('chats')
			.where('uid1', '==', nid)
			.where('uid2',"==",auth.currentUser.uid)
			.get();
		query2= await db.collection('chats')
			.where('uid2', '==', nid)
			.where('uid1',"==",auth.currentUser.uid)
			.get();
		if(query1.size>0){
			enterChat(query1.docs[0].id,"Chat with ".concat(name))
		}
		else if(query2.size>0){
			enterChat(query2.docs[0].id,"Chat with ".concat(name))
		}
		else{
			Alert.alert("An error has occured and there is no chat of that type")
		}
	
	}
  function Feed({ navigation }) {
   const [friends,setFriends] = useState([]);
	useLayoutEffect ( ()=> {
		const friendSubscribe = db.collection('users').doc(auth.currentUser.uid).collection('Friends').onSnapshot( (snapshot) => setFriends(
			snapshot.docs.map(doc => ( 
			[doc.id,doc.get("name")]
		))
		))
		return friendSubscribe;
	},[]);  
  return (
    <View style={styles.header}>
    <View>
      <Button
        title="Menu"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
    </View>
	  <Text style={styles.info}>People Around You</Text>
	  {
		friends.map( (data) => {
			if(data[1]!=null){
			return (<Text style={styles.friend} onPress={() => onFriend(this,data[0],data[1])}>{data[1]}</Text>);
			}
			return (<></>);
		}
		)  
	  } 
	  <Home/>
    </View>
  );
}

function Friends( {navigation} ) {
  return (
    <View>
    <View>
      <Button
        title="Menu"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
    </View>
      <FriendsList/>
    </View>
  );
}


function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

  return (
    
     <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Friends List" component={Friends} />
    </Drawer.Navigator>
    
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height:'100%',
  },
    info: {
    fontSize: 15,
    textAlign: 'center',
    padding: 20,
    },
	
    users: {
    fontSize: 15,
    textAlign: "center",
    padding: 20,
    paddingLeft: 30,
    },
	
	friend: {
    fontSize: 15,
    textAlign: "center",
    padding: 20,
    paddingLeft: 30,
	color: '#00FF00',
    },
})