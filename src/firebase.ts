import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVJZb7LGF8KguDG5DZgdsPkKhtm62QPqY",
  authDomain: "mvt-entrenamientos-alejandro.firebaseapp.com",
  projectId: "mvt-entrenamientos-alejandro",
  storageBucket: "mvt-entrenamientos-alejandro.firebasestorage.app",
  messagingSenderId: "414020836976",
  appId: "1:414020836976:web:e72832e569f7fc60ff1eb5"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);