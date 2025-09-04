import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Importaciones para que funcionen los formularios
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component'; //Importe mi componente NO INDEPENDIENTE
import { FooterComponent } from './footer/footer.component';
import { CalculadoraComponent } from './calculadora/calculadora.component'; 

@NgModule({

  //En esta parte se declaran los componentes NO independientes.
  declarations: [
    AppComponent,
    HeaderComponent, //componente no independiente
    FooterComponent,
    CalculadoraComponent   
  ],

  //Se importan los componentes que SI SON INDEPENDIENTES 
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
