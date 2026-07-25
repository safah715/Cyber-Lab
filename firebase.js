import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, updateDoc, deleteDoc, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDRjho_BavRfG-FVp6bFPgFJTqOtVg14vg",
    authDomain: "cyber-lap.firebaseapp.com",
    projectId: "cyber-lap",
    storageBucket: "cyber-lap.appspot.com",
    messagingSenderId: "903348414951",
    appId: "1:903348414951:web:015a7bccb626e3794bb542",
    measurementId: "G-35BFVVJMNJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, storage, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged, doc, setDoc, getDoc, collection, getDocs, updateDoc, deleteDoc, query, where, orderBy, ref, uploadBytes, getDownloadURL };