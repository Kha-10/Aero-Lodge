import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBf0fwjqx1a-lA97geq7eNVvAiwk_ISTao",
    authDomain: "hotelbooking-45d7a.firebaseapp.com",
    projectId: "hotelbooking-45d7a",
    storageBucket: "hotelbooking-45d7a.appspot.com",
    messagingSenderId: "767594393909",
    appId: "1:767594393909:web:58f3f9a783012d3c325c7c",
    measurementId: "G-HGR66RD67L"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  export { db }