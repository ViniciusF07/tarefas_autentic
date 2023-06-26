import firebase from "firebase"



var firebaseConfig = {
  apiKey: "AIzaSyC67BjDi9nlLgg0y85CZmsqifb6QZC1irQ",
  authDomain: "authentication-58b85.firebaseapp.com",
  projectId: "authentication-58b85",
  storageBucket: "authentication-58b85.appspot.com",
  messagingSenderId: "588487035893",
  appId: "1:588487035893:web:507c7596a2acc9b69feebc"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase