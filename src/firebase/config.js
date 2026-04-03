// src/firebase/config.js
// ⚠️  SUBSTITUA com as suas credenciais do Firebase Console
// Firebase Console → Project Settings → General → Your Apps → Web App

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDTvU4jHgSLF4sHYjkeLZGUSgTCLwFwoRI",
  authDomain: "play-burguer-46633.firebaseapp.com",
  projectId: "play-burguer-46633",
  storageBucket: "play-burguer-46633.firebasestorage.app",
  messagingSenderId: "549922265464",
  appId: "1:549922265464:web:ed15884df2c555ef00908d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
export default app;

/*
  ──────────────────────────────────────────────
  ESTRUTURA DO FIRESTORE ESPERADA:
  ──────────────────────────────────────────────
  Collection: "menu"
  Documento exemplo:
  {
    id: "auto-gerado",
    name: "Double Stack 404",
    description: "Dois smash burgers, queijo cheddar, bacon crocante, molho especial",
    price: 32.90,
    imageUrl: "https://...",
    category: "burgers",   // "burgers" | "combos" | "bebidas" | "sobremesas"
    isHighlight: true,     // aparece na seção de destaques
    available: true
  }
  ──────────────────────────────────────────────
*/
