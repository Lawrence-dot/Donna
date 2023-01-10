import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCe2i21SvXIF1XvV7eCCNl8NE9yoWzCws",
  authDomain: "crpt-d38f8.firebaseapp.com",
  projectId: "crpt-d38f8",
  storageBucket: "crpt-d38f8.appspot.com",
  messagingSenderId: "418253415292",
  appId: "1:418253415292:web:6cb108459a7bb5d8327af9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
