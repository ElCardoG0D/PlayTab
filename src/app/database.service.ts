import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = 'http://localhost:3000'; // Asegúrate de que la URL de tu servidor esté configurada correctamente

  constructor(private http: HttpClient) {}

  // Método para registrar un usuario
  registerUser(userRun: string, nombreUsuario: string, emailUsuario: string, contraseñaUsuario: string, comunaId: number) {
    const body = {
      User_Run: userRun,
      Nombre_Usuario: nombreUsuario,
      Email_Usuario: emailUsuario,
      Contraseña_Usuario: contraseñaUsuario,
      Comuna_Id: comunaId
    };
    return this.http.post(`${this.apiUrl}/register`, body);
  }
}
