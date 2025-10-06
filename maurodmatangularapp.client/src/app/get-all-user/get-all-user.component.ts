import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../Services/Usuarios/usuario.service'
import { Usuario } from '../../Models/Usuario';
import { Result } from '../../Models/Result';

//Navegar entre vistas en Angular
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-get-all-user',
  standalone: false,
  templateUrl: './get-all-user.component.html',
  styleUrl: './get-all-user.component.css'
})
export class GetAllUserComponent implements OnInit {

  listaUsuarios!: Usuario[]

  usuario!: Usuario

  result!: Result

  idUsuario!: number
  constructor(private usuarioService: UsuarioService, private router: Router) { }

  /* ngOnInit - Inicializar el componente
  Se usa a menudo para llamar a servicios y obtener los datos iniciales que necesita el componente.
  Se llama después de que Angular configure las propiedades de entrada, pero antes de que se renderice la vista,
  es el lugar adecuado para realizar dichas solicitudes HTTP o inicializar otros servicios.
  */

  ngOnInit() {
    this.getAllUsers()
  }

  getAllUsers() {
    this.usuarioService.getAllUsers().subscribe((data: Usuario[]) => {
      this.listaUsuarios = data;
      console.log("Datos de GetAll Result:", this.listaUsuarios);
    });
  }

  delete(idUsuario: number) {
    console.log("Datos Delete IdUsuario:", idUsuario);

    this.usuarioService.delete(idUsuario).subscribe((data: Result) => {
      this.result = data;
      console.log("Datos de Delete Result:", this.result);
      alert(this.result.correct);
      this.getAllUsers();
    });
  }


}
