import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  standalone: false,
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css'
})
export class CalculadoraComponent {

  // Propiedades para Two-Way Binding inicializadas en 0
  public Numero1: number = 0;
  public Numero2: number = 0;

  public Resultado: number | string = 0;

  //El constructor no debe usarse para la lógica de inicialización de propiedades que provienen de los inputs del usuario.
  constructor() { }

  // Métodos de operaciones
  Suma() {
    this.Resultado = this.Numero1 + this.Numero2;
  }

  Resta() {
    this.Resultado = this.Numero1 - this.Numero2;
  }

  Multiplicacion() {
    this.Resultado = this.Numero1 * this.Numero2;
  }

  Division() {
    if (this.Numero2 === 0) {
      this.Resultado = "No se puede dividir por cero";
    } else {
      this.Resultado = this.Numero1 / this.Numero2;
    }
  }
}

