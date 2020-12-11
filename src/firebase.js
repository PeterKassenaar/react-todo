import firebase from "firebase/app";
import 'firebase/firestore';

// Firebase configuration stuff. Used in App.js
const firebaseConfig = {
	apiKey: "AIzaSyB3-5TtPp4RqSv29Om4mycUx1ghw6PJVfc",
	authDomain: "cities-app-firestore.firebaseapp.com",
	databaseURL: "https://cities-app-firestore.firebaseio.com",
	projectId: "cities-app-firestore",
	storageBucket: "cities-app-firestore.appspot.com",
	messagingSenderId: "621166094347",
	appId: "1:621166094347:web:5ffbdacaec154dccd77f0e"
};

firebase.initializeApp(firebaseConfig)
export default firebase

