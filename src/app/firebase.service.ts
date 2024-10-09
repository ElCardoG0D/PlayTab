import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"; // Funciones de autenticación
import { getFirestore, Firestore, doc, setDoc } from "firebase/firestore"; // Funciones para Firestore

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private auth: any;
  private firestore: Firestore;

  constructor() {
    // Configuración de Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyBKI9lynyh2K64Fh7iLXY_NvS07m7X29wI",
      authDomain: "playtabdb.firebaseapp.com",
      projectId: "playtabdb",
      storageBucket: "playtabdb.appspot.com",
      messagingSenderId: "453803436016",
      appId: "1:453803436016:web:c7e4fd694fa70802175f35",
      measurementId: "G-DVMBS97M85"
    };

    // Inicializa Firebase
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app); // Inicializa autenticación
    this.firestore = getFirestore(app); // Inicializa Firestore
  }
  

  // Método para iniciar sesión
  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  // Método para registrar un nuevo usuario
  async signup(email: string, password: string, userData: any) {
    try {
      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      // Agregar datos del usuario a Firestore
      await this.addUserToFirestore(userCredential.user.uid, userData);
      return userCredential;
    } catch (error) {
      throw error; // Lanza el error para ser capturado en el componente
    }
  }

  // Método para cerrar sesión
  async logout() {
    return await signOut(this.auth);
  }

  // Método para agregar un usuario a Firestore
  async addUserToFirestore(uid: string, userData: any) {
    const userRef = doc(this.firestore, `usuarios/${uid}`);
    await setDoc(userRef, userData); // Guarda los datos del usuario en Firestore
  }
}
