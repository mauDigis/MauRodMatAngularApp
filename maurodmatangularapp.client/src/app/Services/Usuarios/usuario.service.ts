import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Result } from '../../../Models/Result'
import { Usuario } from '../../../Models/Usuario'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Name } from '../RandomUser/interfaces-api.service';

//La anotación @Injectable indica que el servicio puede ser inyectado mediante Inyección de dependencias en Angular.

@Injectable({

  //providedIn es un atributo especial de las anotaciones inyectables.
  /*providedIn: 'root' significa que Angular creará una sola instancia de esta clase
    para poder inyectarla de forma global en los componentes que la necesite*/

  providedIn: 'root'
})
export class UsuarioService {

  private URLGetAll = 'https://localhost:7045/api/Usuario/GetAll';
  constructor(private http: HttpClient) { }

  /*Observable es la petición en espera. No hace nada por sí solo; solo te da la "garantía" de que los datos vendrán.
    Es una funcion asincrona, hasta que no se suscriban(hagan una peticion) devolvera los valores obtenidos.
  */

  // Obtener la lista de Usuarios
  getAllUsers(): Observable<Usuario[]> {
    var getAll = this.http.get<any>(this.URLGetAll).pipe(
      map((result: Result) => result.objects.map((user: any): Usuario => ({
        idUsuario: user.idUsuario,
        userName: user.userName,
        nombre: user.nombre,
        apellidoPaterno: user.apellidoPaterno,
        apellidoMaterno: user.apellidoMaterno,
        email: user.email,
        passwrd: user.passwrd,
        sexo: user.sexo,
        telefono: user.telefono,
        celular: user.celular,
        fechaNacimiento: user.fechaNacimiento,
        curp: user.curp,
        rol: {
          idRol: user.rol.idRol,
          nombre: user.rol.nombre,
          roles: user.rol.roles
        },
        usuarios: user.usuarios
      })))
    )
    //// Transforma la respuesta para obtener solo el array 'objects'
    //map(response => response.objects as Usuario[]),
    catchError(this.handleError) // Manejo de errores
    return getAll;
  }

  //Obtener el usuario por id
  getById(idUsuario: number): Observable<Usuario> {

    const URLGetById = 'https://localhost:7045/api/Usuario/GetById?IdUsuario=' + `${idUsuario}`;
    console.log('IdUsuario a enviar:', idUsuario);
    return this.http.get<Usuario>(URLGetById).pipe(
      // Transforma la respuesta para obtener un modelo de Usuario
      map(response => response as Usuario),
      catchError(this.handleError) // Manejo de errores
    );
  }

  //Agregar un Usuario
  add(usuario: Usuario): Observable<Result> {

    const URLAdd = 'https://localhost:7045/api/Usuario/Add';
    console.log('Objeto a enviar:', usuario);
    return this.http.post<Result>(URLAdd, usuario).pipe(
      // Transforma la respuesta para obtener un modelo de Result
      map(response => response as Result),
      catchError(this.handleError) // Manejo de errores
    );

  }

  //Actualizar un Usuario
  update(usuario: Usuario): Observable<Result> {

    const URLUpdate = 'https://localhost:7045/api/Usuario/Update';
    console.log('Objeto a Update enviar service:', usuario);

    return this.http.put<Result>(URLUpdate, usuario).pipe(
      // Transforma la respuesta para obtener un modelo de Result
      map(response => response as Result),
      catchError(this.handleError) // Manejo de errores
    );
    

  }

  //Eliminar el usuario por id
  delete(idUsuario: number): Observable<Result> {
    console.log('idUsuario enviado service: ', idUsuario)
    const URLDelete = 'https://localhost:7045/api/Usuario/Delete?IdUsuario=' + `${idUsuario}`;

    return this.http.delete<Result>(URLDelete).pipe(
      // Transforma la respuesta para obtener solo el array
      map(response => response),
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let mensaje = 'Ocurrió un error inesperado.';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      mensaje = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del servidor
      mensaje = `Error del servidor: ${error.status}, mensaje: ${error.message}`;
    }
    return throwError(() => mensaje);
  }
}
