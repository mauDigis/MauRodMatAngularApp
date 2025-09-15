
//Permite realizar peticione HTTP y consumo de apis
import { HttpClientModule } from '@angular/common/http';

//Decorador de TypeScript que se usa para definir un módulo.
import { NgModule } from '@angular/core';

//Renderiza el DOM del navegador
import { BrowserModule } from '@angular/platform-browser'; 

//Importaciones para que funcionen los formularios
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

//Importe el modulo para administrar rutas.
import { AppRoutingModule } from './app-routing.module';

//Importe mis componentes NO INDEPENDIENTES
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component'; 
import { FooterComponent } from './footer/footer.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { HomeComponent } from './home/home.component';
import { RandomUserComponent } from './random-user/random-user.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { RandomUserApiInterfacesComponent } from './random-user-api-interfaces/random-user-api-interfaces.component';
import { FavoritosComponent } from '../app/peliculas-favoritas/peliculas-favoritas.component'


@NgModule({

  //En esta parte se declaran los componentes NO independientes.
  declarations: [
    AppComponent,
    HeaderComponent, 
    FooterComponent,
    CalculadoraComponent,
    HomeComponent,
    RandomUserComponent,
    PeliculasComponent,
    RandomUserApiInterfacesComponent,
    FavoritosComponent
  ],

  //Se importan los componentes que SI SON INDEPENDIENTES 
  imports: [
    BrowserModule,
    HttpClientModule, //Modulo para consumir Apis
    AppRoutingModule, //Modulo que configura rutas
    FormsModule, //Modulo para permitir formularios
    ReactiveFormsModule //Modulo para permitir formularios
    
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
