import { Component, OnInit } from '@angular/core'
import { UsuarioService } from '../Services/Usuarios/usuario.service'
import { Usuario } from '../../Models/Usuario'
import { Result } from '../../Models/Result';
import { Rol } from '../../Models/Rol';

//Navegar entre vistas en Angular
import { Router } from '@angular/router';

//
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-form',
  standalone: false,
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css',
})
export class UsuarioFormComponent implements OnInit{

  result!: Result

  // Inicializa el objeto usuario con los valores por defecto
    usuario: Usuario = {
    idUsuario: 0,
    userName: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    passwrd: '',
    sexo: '',
    telefono: '',
    celular: '',
    fechaNacimiento: '',
    curp: '',
      rol: {
        idRol: 0, // Inicializa el id del rol a 0
        nombre: '', 
        roles: null 
      },
    usuarios: null
  };

  private IdUsuario!: number;

  constructor(private usuarioService: UsuarioService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    //Recupera el idUsuario de la URL.
    this.route.params.subscribe((params) => {
      this.IdUsuario = params['idUsuario']; // 'idUsuario' should match the parameter name in your route definition
      console.log('IdUsuario es:', this.IdUsuario)

      if (this.IdUsuario > 0) {
        this.getById(this.IdUsuario)
      } else {
        this.router.navigate(['/addUser']);
      }
    });

  }

  public GuardarUsuario() {
    if (this.usuario.idUsuario === 0)
    {//Add
      console.log('IdUsuario es:', this.usuario.idUsuario)
      console.log('Datos de mi objeto usuario:', this.usuario)

      //Mando a llamar mi Método Add
      this.add(this.usuario)
    } else {//Update
      console.log('Entro al update')
      console.log('Datos de mi objeto usuario:', this.usuario)
      //Mando a llamar mi Método Update
      this.update(this.usuario)
    }
  }

  /* .subscribe() activa la petición. Le dice al Observable "empieza a trabajar"
   y le proporciona una función para procesar los datos una vez que lleguen.*/

  //Método Add de mi servicio
  private add(usuario: Usuario) {
    console.log('Entro al add')
    this.usuarioService.add(usuario).subscribe((data: Result) => {
      this.result = data;
      console.log("Datos de Add Result:", this.result);

      if (this.result.correct === true) {
        alert('Se agrego exitosamente el Usuario');

        //Carga el componente asociado a esa ruta.
        this.router.navigate(['/getallusers']);
      } else {
        alert(this.result.errorMessage);
      }
      
    })
  }

  //Método Update de mi servicio
  private update(usuario: Usuario) {
    console.log("Datos de Update a enviar component.ts:", this.usuario);

    this.usuarioService.update(usuario).subscribe((data: Result) => {
      this.result = data;
      console.log("Datos de Update Result:", this.result);
      alert('Se actualizo exitosamente el Usuario');

      if (this.result.correct === true) {
        this.router.navigate(['/getallusers']);
      } else {
        alert(this.result.errorMessage);
      }
    })
  }

  //Método GetById de mi Servicio
  private getById(idUsuario: number) {
    this.usuarioService.getById(idUsuario).subscribe((data: Usuario) => {
      this.usuario = data;
      console.log("Datos de GetById Result:", this.usuario);
    });
  }

}//component
