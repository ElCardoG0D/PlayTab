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

  // 5. Métodos para las Categorias y Subcategorias. *************************************
  // Método para obtener todas las Categorias
  getCategoria(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categoria`); 
  }

  // Método para obtener comunas filtradas por región
  getSubCategoria(categoriaId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/subcategoria/${categoriaId}`);
  }

  // Método para obtener comunas filtradas por región
  getMaxJugador(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cantidad`); 
  }

  // 6.Método para registrar una Actividad
  registerActividad(
    Nom_Actividad: string,
    Desc_Actividad: string,
    Direccion_Actividad: string,
    Id_MaxJugador: number,
    Fecha_INI_Actividad: string,
    Fecha_TER_Actividad: string,
    Id_Comuna: number,
    Id_SubCategoria: number,
    Id_Anfitrion_Actividad: number
  ): Observable<any> {
    const url = `${this.apiUrl}/actividad`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    const body = {
      Nom_Actividad,
      Desc_Actividad,
      Direccion_Actividad,
      Id_MaxJugador,
      Fecha_INI_Actividad,
      Fecha_TER_Actividad,
      Id_Comuna,
      Id_SubCategoria,
      Id_Estado: 15, 
      Id_Anfitrion_Actividad
    };
  
    return this.http.post(url, body, { headers });
  }

  //7. Obtener actividades, este es para el tab 1
  getActividades(): Observable<any> {
    return this.http.get(`${this.apiUrl}/actividades`);
  }
}
