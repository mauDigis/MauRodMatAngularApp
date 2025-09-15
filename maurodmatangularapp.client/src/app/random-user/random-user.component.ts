//OnInit

import { Component, OnInit } from '@angular/core';

//Importo mi servicio en mi componente
import { RandomuserService } from '../Services/RandomUser/randomuser.service'; 

//@Component Es un decorador que marca una clase como un componente de Angular.
@Component({
  selector: 'app-random-user',
  standalone: false,
  templateUrl: './random-user.component.html',
  styleUrl: './random-user.component.css'
})
export class RandomUserComponent implements OnInit {
  user: any;
  constructor(private randomuserService: RandomuserService) { }

  /* ngOnInit - Inicializar el componente
  Se usa a menudo para llamar a servicios y obtener los datos iniciales que necesita el componente.
  Se llama después de que Angular configure las propiedades de entrada, pero antes de que se renderice la vista,
  es el lugar adecuado para realizar dichas solicitudes HTTP o inicializar otros servicios.
  */
  ngOnInit() {
    //Get User
    /* .subscribe() activa la petición. Le dice al Observable "empieza a trabajar"
    y le proporciona una función para procesar los datos una vez que lleguen.*/

    this.randomuserService.getUser().subscribe((data) => {
      this.user = data.results[0];
      //console.log(this.user);
    });
  }



}
