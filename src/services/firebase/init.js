// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDywciwQKdXPYrq_8xS-rlE_mvm3gcLYew",
  authDomain: "storekeep-d2ed2.firebaseapp.com",
  projectId: "storekeep-d2ed2",
  storageBucket: "storekeep-d2ed2.appspot.com",
  messagingSenderId: "963970161229",
  appId: "1:963970161229:web:cdc9b6e08da176f1e41a04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
const firestoreDb = getFirestore(app);
// Initialize Firebase Authentication
const auth = getAuth(app);
// Initialize Cloud Storage
const storage = getStorage(app);


// Export Auth and firestoreDb
export { auth, firestoreDb, storage };