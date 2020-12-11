import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase/app';

// Bootstrap styling stuff
import 'bootstrap/dist/css/bootstrap.min.css';

// firebase configuration stuff
firebase.initializeApp({
    apiKey: "AIzaSyB3-5TtPp4RqSv29Om4mycUx1ghw6PJVfc",
    authDomain: "cities-app-firestore.firebaseapp.com",
    databaseURL: "https://cities-app-firestore.firebaseio.com",
    projectId: "cities-app-firestore",
    storageBucket: "cities-app-firestore.appspot.com",
    messagingSenderId: "621166094347",
    appId: "1:621166094347:web:5ffbdacaec154dccd77f0e"
});

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
