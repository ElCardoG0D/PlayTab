import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private apiUrl = 'http://localhost:3000'; // URL de tu servidor Node.js

  constructor(private http: HttpClient) { }

  // 1. Métodos para las Regiones y Comunas.
  // Método para obtener todas las regiones
  getRegiones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/regiones`); 
  }

  // Método para obtener comunas filtradas por región
  getComunasPorRegion(regionId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/comunas/${regionId}`);
  }

  // 2. Método para registrar un usuario
  registerUser(rut: string, nombre: string, correo: string, contraseña: string, celular: string, comuna: number, fechaNacimiento: string): Observable<any> {
    const url = `${this.apiUrl}/register`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    // Crear el cuerpo de la solicitud
    const body = {
      Run_User: rut,
      Nom_User: nombre,
      Correo_User: correo,
      Contra_User: contraseña,
      Celular_User: celular,
      FechaNac_User: fechaNacimiento,
      Id_Comuna: comuna
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
