import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  //1. Funcion para guardar datos.
  GuardarId(clave: string, valor: any){
    localStorage.setItem(clave,JSON.stringify(valor))
  }

  //2. Función para obtener datos
  ObtenerId(clave: string){
    const valor = localStorage.getItem(clave);
    //Declarar ? es como hacer un if - else, si funciona da el JSON sino retorna el null
    return valor ? JSON.parse(valor) :  null;
  }

  //3. Elimnar Datos
  ElimnarId(clave: string){
    localStorage.removeItem(clave);
  }

  //4. Para limpiar los datos
  LimpiarId(){
    localStorage.clear();
  }

}
