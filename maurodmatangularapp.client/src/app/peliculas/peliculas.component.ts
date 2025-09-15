import { Component, OnInit } from '@angular/core';

//Importacion de mi servicio
import {PeliculasService, Result, Pelicula, ResultFavMovie, PeliculaValores } from '../Services/Peliculas/peliculas.service';

//@Component Es un decorador que marca una clase como un componente de Angular.
@Component({
  selector: 'app-peliculas',
  standalone: false,
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent implements OnInit{

  movies!: Pelicula[];

  resultFavMovie!: ResultFavMovie;

  pelicula!: Pelicula;
  constructor(private PeliculaService: PeliculasService ) { }

  ngOnInit() {
    this.getMovie();
  }

  getMovie() {
    this.PeliculaService.getMovie().subscribe((data: Result) => {
      this.movies = data.results;
      console.log("Datos de Result:", this.movies);
    });
  }

  // Este método recibe un objeto de tipo 'Pelicula' del *ngFor
  postFavMovie(pelicula: Pelicula) {
    const favData: PeliculaValores = {
      media_type: 'movie',
      media_id: pelicula.id,
      favorite: true
    };
    // 2. Llama al servicio y se suscríbe a la respuesta
    this.PeliculaService.postFavoriteMovie(favData).subscribe(
      // La respuesta de la API 'data' es del tipo ResultFavMovie
      (data: ResultFavMovie) => {
        // Asigna la respuesta directamente
        this.resultFavMovie = data;
        console.log("Resultado de la petición:", this.resultFavMovie);

        // notificación al usuario
        alert(this.resultFavMovie.status_message);
      },
      (error) => {
        // Maneja el error en caso de que la petición falle
        console.error("Error al agregar a favoritos:", error);
        alert('Hubo un error al agregar la película a favoritos.');
      }
    );
  }
}
