import React,{ useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Header from './Header';
import {auth, db} from "../firebase";

export default function FriendsList(){
	const [friends,setFriends] = useState([]);
	useEffect ( ()=> {
		const friendSubscribe = db.collection('users').doc(auth.currentUser.uid).collection('Friends').onSnapshot( (snapshot) => setFriends(
			snapshot.docs.map(doc => ( 
			[doc.get("name")]
		))
		))
		return friendSubscribe;
	},[]);
    return (
      <View>
	  <Text style={styles.info}>Friends</Text>
      {
		friends.map( (name) => {
			return (<Text style={styles.list}>{name}</Text>);
		}
		)  
	  }
      </View>
    );
}

const styles = StyleSheet.create({
    info: {
    fontSize: 15,
    textAlign: 'center',
    padding: 20,
    },
    list: {
    fontSize: 15,
    textAlign: 'left',
    padding: 20,
    }

});