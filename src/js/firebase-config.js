// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC5f2vPHEWAI2rNn1x2CpXirManrwS4-dI",
    authDomain: "coffee-management-system-bae05.firebaseapp.com",
    projectId: "coffee-management-system-bae05",
    storageBucket: "coffee-management-system-bae05.appspot.com",
    messagingSenderId: "87891901961",
    appId: "1:87891901961:web:48b5441aff8d22c3c302d8",
    measurementId: "G-KQXKEG6CC8"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

// Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage();