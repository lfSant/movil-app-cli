import { Usuario } from './usuario';

export class Bache {
  id: number = 0;
  latitud: number = 0;
  longitud: number = 0;
  //posicion: string = '';
  descripcion: string = '';
  foto: string = '';
  fecha: Date = new Date();
  usuario: Usuario = new Usuario();
}
