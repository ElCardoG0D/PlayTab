// firebase.service.ts

import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"; // Importa funciones de autenticación

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app: any;
  private analytics: any;
  private auth: any;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBKI9lynyh2K64Fh7iLXY_NvS07m7X29wI",
      authDomain: "playtabdb.firebaseapp.com",
      projectId: "playtabdb",
      storageBucket: "playtabdb.appspot.com",
      messagingSenderId: "453803436016",
      appId: "1:453803436016:web:c7e4fd694fa70802175f35",
      measurementId: "G-DVMBS97M85"
    };

    this.app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.app);
    this.auth = getAuth(this.app); // Inicializa la autenticación
  }

  // Método para iniciar sesión
  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  // Método para registrar un nuevo usuario
  async signup(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Método para cerrar sesión
  async logout() {
    return await signOut(this.auth);
  }
}
