import { Component, OnInit } from '@angular/core';

//Importacion de mi servicio
import { PeliculasService, Result, Pelicula, ResultFavMovie, PeliculaValores } from '../Services/Peliculas/peliculas.service';

@Component({
  selector: 'app-peliculas-favoritas',
  standalone: false,
  templateUrl: './peliculas-favoritas.component.html',
  styleUrl: './peliculas-favoritas.component.css'
})
export class FavoritosComponent implements OnInit {

  favoriteMovies: Pelicula[] = [];

  constructor(private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.getFavoriteMovies();
  }

  getFavoriteMovies(): void {
    this.peliculasService.getFavoriteMovies().subscribe(
      response => {
        this.favoriteMovies = response.results;
        console.log('Películas favoritas:', this.favoriteMovies);
      },
      error => {
        console.error('Error al obtener las películas favoritas:', error);
        // Maneja el error, por ejemplo, mostrando un mensaje
      }
    );
  }
   
  deleteFavMovie(pelicula: Pelicula) {
    // 1. Crea el objeto con la estructura correcta para la API
    const unfavData: PeliculaValores = {
      media_type: 'movie',
      media_id: pelicula.id,
      favorite: false //Elimina mi pelicula
    };
    // 2. Llama al servicio y suscríbete a la respuesta
    this.peliculasService.postFavoriteMovie(unfavData).subscribe(
      (data: ResultFavMovie) => {
        console.log("Resultado de la petición:", data);
        alert(data.status_message);

        // Recargar la lista de favoritos después de eliminar
        this.getFavoriteMovies();
      },
      (error) => {
        console.error("Error al eliminar de favoritos:", error);
        alert('Hubo un error al eliminar la película de favoritos.');
      }
    );
  }
}

