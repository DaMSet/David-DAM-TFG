// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where, orderBy } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjEp3-XyH49UdAyStPbxpjFOqgc0KKV5M",
    authDomain: "proyectovue-72222.firebaseapp.com",
    projectId: "proyectovue-72222",
    storageBucket: "proyectovue-72222.firebasestorage.app",
    messagingSenderId: "155370568117",
    appId: "1:155370568117:web:278708855386029e2201fc",
    measurementId: "G-97QX8SFE09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Export functions for easy use
export { 
    db, 
    storage, 
    collection, 
    getDocs, 
    addDoc, 
    doc, 
    updateDoc, 
    deleteDoc, 
    query, 
    where, 
    orderBy 
};