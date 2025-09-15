import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

//https://codingpotions.com/angular-servicios-llamadas-http/

//La anotación @Injectable indica que el servicio puede ser inyectado mediante Inyección de dependencias en Angular.
@Injectable({

  //providedIn es un atributo especial de las anotaciones inyectables.
  /*providedIn: 'root' significa que Angular creará una sola instancia de esta clase
    para poder inyectarla de forma global en los componentes que la necesite*/

  providedIn: 'root'
})

//interface Usuario {
//  date: string;
//  temperatureC: number;
//  temperatureF: number;
//  summary: string;
//}

export class RandomuserService {
  constructor(private http: HttpClient) { }

  /*Observable es la petición en espera. No hace nada por sí solo; solo te da la "garantía" de que los datos vendrán.
    Es una funcion asincrona, hasta que no se suscriban(hagan una peticion) devolvera los valores obtenidos.
  */
  getUser(): Observable<any> {
    return this.http.get('https://randomuser.me/api/');
  }
}
