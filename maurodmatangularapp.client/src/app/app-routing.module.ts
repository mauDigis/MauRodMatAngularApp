import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculadoraComponent } from '../app/calculadora/calculadora.component';
import { HomeComponent } from '../app/home/home.component';
import { RandomUserComponent } from '../app/random-user/random-user.component'
import { RandomUserApiInterfacesComponent } from '../app/random-user-api-interfaces/random-user-api-interfaces.component'
import { PeliculasComponent } from '../app/peliculas/peliculas.component'
import { FavoritosComponent } from '../app/peliculas-favoritas/peliculas-favoritas.component'

const routes: Routes = [

  { path: "", component: HomeComponent }, 
  { path: "calculadora", component: CalculadoraComponent },
  { path: "randomuser", component: RandomUserComponent },
  { path: "randomuserinterface", component: RandomUserApiInterfacesComponent },
  { path: "peliculas", component: PeliculasComponent },
  { path: "peliculasfav", component: FavoritosComponent },
  { path: "**", redirectTo: "" } //Cualquier ruta no registrada redirecciona a home

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
