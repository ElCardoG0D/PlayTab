import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private apiUrl = 'http://localhost:3000'; // URL de tu servidor Node.js

  constructor(private http: HttpClient) { }

  // Método para registrar un usuario
  registerUser(rut: string, nombre: string, correo: string, contraseña: string, comunaId: number, fechaNacimiento: string): Observable<any> {
    const url = `${this.apiUrl}/register`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    // Crear el cuerpo de la solicitud
    const body = {
      Run_User: rut,
      Nom_User: nombre,
      Correo_User: correo,
      Contra_User: contraseña,
      FechaNac_User: fechaNacimiento,
      Id_Comuna: comunaId
    };

    // Hacer la solicitud POST al servidor
    return this.http.post(url, body, { headers });
  }

  // Método para iniciar sesión (opcional si lo necesitas)
  loginUser(correo: string, contraseña: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    const body = {
      Correo_User: correo,
      Contra_User: contraseña
    };

    return this.http.post(url, body, { headers });
  }
}
