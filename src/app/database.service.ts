import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  private apiUrl = 'https://backendplaytab-production.up.railway.app';
  
  constructor(private http: HttpClient) { }
  
  // 1. Regiones y Comunas.
  getRegiones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/regiones`); 
  }
  
  getComunasPorRegion(regionId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/comunas/${regionId}`);
  }
  
  // 2. registrar un usuario
  registerUser(rut: string, nombre: string, correo: string, contraseña: string, celular: string, comuna: number, fechaNacimiento: string): Observable<any> {
    const url = `${this.apiUrl}/register`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    const body = {
      Run_User: rut,
      Nom_User: nombre,
      Correo_User: correo,
      Contra_User: contraseña,
      Celular_User: celular,
      FechaNac_User: fechaNacimiento,
      Id_Comuna: comuna
    };
    return this.http.post(url, body, { headers });
  }
  
  // Iniciar sesión (opcional si lo necesitas)
  loginUser(correo: string, contraseña: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    const body = {
      Correo_User: correo,
      Contra_User: contraseña
    };
    
    return this.http.post(url, body, { headers });
  }
  
  // 5. Métodos para las Categorias y Subcategorias.
  getCategoria(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categoria`); 
  }
  
  getSubCategoria(categoriaId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/subcategoria/${categoriaId}`);
  }
  
  // Obtener comunas filtradas por región
  getMaxJugador(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cantidad`); 
  }
  
  // 6. Método para registrar una Actividad
  registerActividad(
    Nom_Actividad: string,
    Desc_Actividad: string,
    Direccion_Actividad: string,
    Id_MaxJugador: number,
    Fecha_INI_Actividad: string,
    Fecha_TER_Actividad: string,
    Id_Comuna: number,
    Id_SubCategoria: number,
    Id_Anfitrion_Actividad: number,
    Celular_User: string
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
      Id_Anfitrion_Actividad,
      Celular_User
    };
    
    return this.http.post(url, body, { headers });
  }
  
  //7. Obtener actividades
  getActividades(Id_Comuna: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/actividades?Id_Comuna=${Id_Comuna}`);
  }
  
  //7.1 Jugadores actuales en sesión.
  getJugadores(Id_Actividad: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/jugdoresInscritos?Id_Actividad=${Id_Actividad}`);
  }
  
  //8. Método para registrar al participante
  registerParticipante(idActividad: number, idUser: number, idAsistencia: number = 900, Tipo_Participante = 200): Observable<any> {
    const url = `${this.apiUrl}/participante`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    const body = {
      Id_Actividad: idActividad,
      Id_Asistencia: idAsistencia,
      Id_User: idUser,
      Tipo_Participante : Tipo_Participante
    };
    
    return this.http.post(url, body, { headers });
  }
  
  //9. Método para eliminar usuario
  deleteUsuario(Id_User: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/borrarUser/${Id_User}`);
  }
  
  //10.Método par cambiar la comuna del usuario.
  cambiarComuna(idComuna: number, idUser: number): Observable<any> {
    const url = `${this.apiUrl}/cambiaComuna`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    const body = {
      Id_Comuna: idComuna,
      Id_User: idUser,
    };
    
    return this.http.put(url, body, { headers });
  }
  
  //11. Obtener actividades
  getHistorial(Id_User: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/historial?Id_User=${Id_User}`);
  }
  //12. Obtener actividades activas de un usuario
  getActividadesActivas(Id_User: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/actividad_activa?Id_User=${Id_User}`);
  }
  //13 .Método para eliminar un usuario de una actividad
  eliminarUsuarioDeActividad(Id_User: number, Id_Actividad: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar_usuario_actividad`, {params: { Id_User, Id_Actividad},});
  }
  
  //14 .Método para el acceso de la Api Key de MAPS
  getGoogleMapsKey(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/maps-key`);
  }  
  
  //15. Método para obtener las actividades del anfitrión
  getActividadesAnfitrion(Id_User: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/actividadesAnfitrion?Id_User=${Id_User}`);
  }  
  
  //16. Método para actualizar la actividad del anfitrión
  updateActividad(
    Id_Actividad: number,
    Desc_Actividad: string,
    Direccion_Actividad: string,
    Id_MaxJugador: number
  ): Observable<any> {
    const url = `${this.apiUrl}/updateActividad/${Id_Actividad}`;
    const body = {
      Desc_Actividad,
      Direccion_Actividad,
      Id_MaxJugador,
    };
    console.log('Cuerpo de la solicitud:', body); 
    return this.http.put(url, body);
  }  
  
  //17. Método para borrar una actividad del anfitrión
  deleteActividad(Id_Actividad: number): Observable<any> {
    const url = `${this.apiUrl}/actividad/${Id_Actividad}`;
    return this.http.delete(url);
  }
  
  //18. Método pata obtener los usuarios inscritos en la actividad del anfitrión
  getUsuariosInscritos(idActividad: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios-inscritos/${idActividad}`);
  }
  
  //19. Método actualizo la asistencia de los jugadores
  actualizarAsistencia(Id_User: number, Id_Actividad: number, Id_Asistencia: number): Observable<any> {
    const url = `${this.apiUrl}/actualizar-asistencia`;
    const body = { Id_User, Id_Actividad, Id_Asistencia };
    return this.http.put(url, body);
  }
  
  //20. Método para insertar/actualizar el favorito del usuario
  InsertUpdateFavorito(IdSubCategoria: number, idUser: number): Observable<any> {
    const url = `${this.apiUrl}/cambiarFavorito`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    const body = {
      Id_SubCategoria: IdSubCategoria,
      Id_User: idUser,
    };
    
    return this.http.post(url, body, { headers });
  }
  
  //21. Método para obtener las actividades favoritas del usuario
  getActividadFavorita(Id_Comuna: number, Id_SubCategoria: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/actividadFavorito`,{params: { Id_Comuna, Id_SubCategoria }});
  }
  // 22. Método para obtener todos los usuarios
  getUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios`);
  }
  // 23. Método para actualizar los datos desde admin view
  updateUsuario(
    Id_User: number,
    Tipo_User: number,
    Nom_User: string,
    Correo_User: string,
    Celular_User: string,
    Id_Comuna: number
  ): Observable<any> {
    const url = `${this.apiUrl}/update-usuario/${Id_User}`;
    const body = {
      Tipo_User,
      Nom_User,
      Correo_User,
      Celular_User,
      Id_Comuna,
    };
    return this.http.put(url, body);
  }
  

}
