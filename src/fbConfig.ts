import * as firebase from 'firebase/app'
import 'firebase/firestore'
// Initialize Firebase
const config = {
   apiKey: "AIzaSyCnd9qcyw_Aaf0kYBwtiLpwS5-eyth5EvY",
    authDomain: "cafe-list-b0022.firebaseapp.com",
    databaseURL: "https://cafe-list-b0022.firebaseio.com",
    projectId: "cafe-list-b0022",
    storageBucket: "cafe-list-b0022.appspot.com",
    messagingSenderId: "275993119033"
};
firebase.initializeApp(config);
const fireStore = firebase.firestore();
fireStore.settings({ timestampsInSnapshots: true });
export default fireStore;