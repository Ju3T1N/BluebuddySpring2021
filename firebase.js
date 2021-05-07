import * as firebase from "firebase";
import firestore from '@react-native-firebase/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
};

let app;

if(firebase.apps.length === 0){
  app=firebase.initializeApp(firebaseConfig);
}
else{
  app= firebase.app();
}

const db = firestore();
const auth=firebase.auth();

export {db,auth};