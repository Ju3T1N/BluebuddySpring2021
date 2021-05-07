import React,{ useState, useMemo, useEffect } from 'react';
import { Text, View, StyleSheet, Alert ,FlatList} from 'react-native';
import {db,auth} from "../firebase";
import * as firebase from "firebase";
import { connect, subscribe,publish, addOnErrorListener,
		 NearbyConfig, useNearbyPublication,
		 useNearbySubscription, checkBluetoothAvailability } 
	from 'react-native-google-nearby-messages';


const Home = ({navigation}) =>{
	
	async function createChat(event, id,name){
		await db 
		.collection("chats")
		.add({
			uid1: auth.currentUser.uid,
			uid2: id,
		})
		await db.collection("users")
		.doc(auth.currentUser.uid)
		.collection ("Pending")
		.doc(id).delete();
		
		await db.collection("users")
		.doc(id)
		.collection ("Outgoing")
		.doc(auth.currentUser.uid).delete();
		
		await db.collection("users")
		.doc(auth.currentUser.uid)
		.collection ("Friends")
		.doc(id)
		.set({
			name: name,
		});
		
		await db.collection("users")
		.doc(id)
		.collection ("Friends")
		.doc(auth.currentUser.uid)
		.set({
			name: auth.currentUser.displayName
		});
	}
    function onPend(event, id, name){
      Alert.alert(
      "Friend Request from: ".concat(name),
      "You can accept this user as a friend and chat.",
      [
        {
          text: "Accept Friend",
          onPress: () => createChat(this, id,name)
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
      ]
    );
	}
	function addPend(event,id,name){
		
		db.collection("users")
		.doc(auth.currentUser.uid)
		.collection("Outgoing")
		.doc(id)
		.set({
			name: name
		});
		db.collection("users")
		.doc(id)
		.collection("Pending")
		.doc(auth.currentUser.uid)
		.set({
			name: auth.currentUser.displayName
		});
		Alert.alert ("Friend requested")
	}
	
	function onNew(event,id,name){
	  Alert.alert(
        "Do you want to request ".concat(name).concat(" as a friend"),"",
        [
        {
          text: "Request Friend",
          onPress: () => addPend(this, id,name)
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
      ]
    );
	}
	async()=>{
      const isBluetoothAvailable = await checkBluetoothAvailability();
    }
    const nearbyConfig = useMemo<NearbyConfig>(() => ({ apiKey: GOOGLE_API_KEY }), []);
    const nearbyStatus1 = useNearbyPublication(nearbyConfig, "Bluebuddy: "+auth.currentUser.displayName+" "+auth.currentUser.uid);
  
    const { nearbyMessages, nearbyStatus } = useNearbySubscription(nearbyConfig);
	
	const [friends,setFriends] = useState([])
	const [outgoing,setOutgoing] = useState([])
	const [pending,setPending] = useState([])
	
	useEffect ( ()=> {
		const friendSubscribe = db.collection('users').doc(auth.currentUser.uid).collection('Friends').onSnapshot( (snapshot) => setFriends(
			snapshot.docs.map(doc => ( 
			[doc.id]
		))
		))
		return friendSubscribe;
	},[]);
	
	useEffect ( ()=> {
		const outSubscribe = db.collection('users').doc(auth.currentUser.uid).collection('Outgoing').onSnapshot( (snapshot) => setOutgoing(
			snapshot.docs.map(doc => ( 
			[doc.id]
		))
		))
		return outSubscribe;
	},[]);
	useEffect ( ()=> {
		const pendSubscribe = db.collection('users').doc(auth.currentUser.uid).collection('Pending').onSnapshot( (snapshot) => setPending(
		snapshot.docs.map(doc => ( 
			[doc.id,doc.get("name")]
		))
		))
		return pendSubscribe;
	},[]);
	
	function list(){
		if(nearbyMessages==null){
			return (<></>);
		}
		return nearbyMessages.map( (message) => {
		  tmp=message.split(' ');
		  if (tmp.length>2 && tmp[0]=="Bluebuddy:"){
			for(i=0; i<outgoing.length;i++){
				if(outgoing[i]==tmp[2] && tmp[1]!="null"){
					return (<Text style={styles.outgoing}>{tmp[1]}</Text>);
				}
			}
			for(i=0; i<pending.length;i++){
				if (pending[i].length==2 && tmp[1]!="null"){
					if(pending[i][0]==tmp[2]){
						return (<Text style={styles.pending} onPress={() => onPend(this,tmp[2],tmp[1])}>{tmp[1]}</Text>);
					}
				}
			}
			for(i=0; i<friends.length;i++){
				if(friends[i]==tmp[2]){
					return (<></>);
				}
			}
			if(tmp[1]!="null"){
				return(<Text style={styles.users} onPress={() => onNew(this,tmp[2],tmp[1])}>{tmp[1]}</Text>);
			}
			return (<></>);
		  }
		}
		);
	}
    return (
      <View>
	  {list()}
      </View>
    );
}
export default Home;
  const styles = StyleSheet.create({
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
	
	pending: {
    fontSize: 15,
    textAlign: "center",
    padding: 20,
    paddingLeft: 30,
	color: '#FFFF00',
    },
	
	outgoing: {
    fontSize: 15,
    textAlign: "center",
    padding: 20,
    paddingLeft: 30,
	color: '#FF8C00',
    },
});