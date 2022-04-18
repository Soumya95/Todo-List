import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyCFuPRKTpsCm3cAX6wGwZOk6fz2UWiSjJk",
    authDomain: "react-todo-4f728.firebaseapp.com",
    projectId: "react-todo-4f728",
    storageBucket: "react-todo-4f728.appspot.com",
    messagingSenderId: "740503432524",
    appId: "1:740503432524:web:7a1d1cc42b431304fd33e9",
});

export default app
export const auth = app.auth()
