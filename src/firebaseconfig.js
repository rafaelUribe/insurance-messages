import firebase from "firebase";
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCaz7WAlGhZJdnmkbDqlOLoDBxeLuWWOQ0",
  authDomain: "insurance-contact-center.firebaseapp.com",
  projectId: "insurance-contact-center",
  storageBucket: "insurance-contact-center.appspot.com",
  messagingSenderId: "131354137794",
  appId: "1:131354137794:web:e705790a2787ea3a73175b",
};

  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  const auth = fire.auth()
  const store = fire.firestore()
  
  export {auth}
  export {store}