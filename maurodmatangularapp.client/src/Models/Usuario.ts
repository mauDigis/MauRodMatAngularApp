
import { Rol } from '../Models/Rol'

//Clase donde coloco mis propiedades.

export interface Usuario {
  idUsuario: number
  userName: string
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  email: string
  passwrd: string
  sexo: string
  telefono: string
  celular: string
  fechaNacimiento: string
  curp: string
  rol: Rol
  usuarios: any
}
