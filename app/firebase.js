// Importa las funciones que necesitas de los SDK que necesitas
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Agrega esta línea para Firestore

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB8-oR5FGaIgwqXmc-5WyMniz8b9vLRpMA",
  authDomain: "arhometest-cf0bc.firebaseapp.com",
  projectId: "arhometest-cf0bc",
  storageBucket: "arhometest-cf0bc.appspot.com",
  messagingSenderId: "1011775757111",
  appId: "1:1011775757111:web:f5d5ef9891e034055758b2",
  measurementId: "G-GDJT9NSS2D"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene la instancia de la base de datos Firestore
export const db = getFirestore(app);

// Obtiene la instancia de autenticación
export const auth = getAuth(app);
