import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable } from 'rxjs';

//Interfaz de Result que tiene un arreglo de peliculas
export interface Result {
  //Arreglo de Pelicula
  results: Pelicula[]
}

//Interfaz de Peliculas
export interface Pelicula {
  adult: boolean
  backdrop_path?: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  peliculas: Array<object>
}

//Resultado de Add Favorite Movie
export interface ResultFavMovie {
  status_code: number;
  status_message: string;
}

//Data to Add Favorite Movie
// Define la estructura para el cuerpo de la petición POST
export interface PeliculaValores {
  media_type: 'movie' | 'tv';
  media_id: number;
  favorite: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class PeliculasService {

  private apiKey: string = '272fedfff5249a07761502ee20cf163a';
  private account_id: string = '22303241';
  private session_id: string = 'b5f22c9667ec304bbaf524e0e08e51923abba433';
  private readAccessToken: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzJmZWRmZmY1MjQ5YTA3NzYxNTAyZWUyMGNmMTYzYSIsIm5iZiI6MTc1NzYxNTA4Ni4wOCwic3ViIjoiNjhjMzEzZWUyOWY0Y2U1MDM0NGU3ODRjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.MEUBvHQ8dUaJwsI98sEGL6Dq78DA7xma7AxOjZ3kfRc';
  private configUrl: string = 'https://api.themoviedb.org/3/movie/popular';

  private postUrl: string = 'https://api.themoviedb.org/3/account/' + `${this.account_id}` + '/favorite?api_key=' +
                            `${this.apiKey}` + '&session_id=' + `${this.session_id}`;
  constructor(private http: HttpClient) { }

  getMovie(): Observable<Result> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.readAccessToken}`
    })
    const movie = this.http.get<Result>(this.configUrl, {headers});
    console.log("Url concatenada:", this.configUrl);
    return movie;
  }

  //postFavoriteMovie(DatosForm: PeliculaValores[]): Observable<ResultFavMovie> {
  //  const resultFav = this.http.post<ResultFavMovie>(this.postUrl, DatosForm);
  //  console.log("Url concatenada Post:", this.postUrl);
  //  return resultFav;
  //}

  // Método para obtener películas favoritas
  getFavoriteMovies(): Observable<Result> {
    const favoriteMoviesUrl = `https://api.themoviedb.org/3/account/${this.account_id}/favorite/movies?session_id=${this.session_id}&api_key=${this.apiKey}`;
    return this.http.get<Result>(favoriteMoviesUrl);
  }

  //Agregar a Fav
  postFavoriteMovie(pelicula: PeliculaValores): Observable<ResultFavMovie> {
    const url = `https://api.themoviedb.org/3/account/${this.account_id}/favorite?session_id=${this.session_id}&api_key=${this.apiKey}`;

    // La petición POST envía un solo objeto
    return this.http.post<ResultFavMovie>(url, pelicula);
  }

  deleteFavoriteMovie(pelicula: PeliculaValores): Observable<ResultFavMovie> {
    const url = `https://api.themoviedb.org/3/account/${this.account_id}/favorite?session_id=${this.session_id}&api_key=${this.apiKey}`;

    // La petición POST envía un solo objeto
    return this.http.post<ResultFavMovie>(url, pelicula);
  }
}
