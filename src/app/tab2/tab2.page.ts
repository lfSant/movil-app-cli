import { Component } from '@angular/core';
import { FotoService } from '../service/foto.service';
import { GeolocalizacionService } from '../service/geolocalizacion.service';
import { BacheService } from '../service/bache.service';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuario';
import { Bache } from '../model/bache';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private fotoService: FotoService, private geolocalizazion: GeolocalizacionService, private bacheService: BacheService, private usuarioService: UsuarioService) { }

  foto: string = '';
  latitud: number = 0;
  longitud: number = 0;
  usuarioSeleccionado: Usuario = new Usuario();

  //parte de usuario
  usuario: Usuario = new Usuario();
  usuarios: Usuario[] = [];

  bache: Bache = new Bache();
  baches: Bache[] = [];
  bandera: boolean = false;

  ngOnInit() {
    this.usuarioService.usuarios().subscribe((data: Usuario[]) => {
      this.usuarios = data
    })
    this.bacheService.baches().subscribe((data: Bache[]) => {
      this.baches = data
    })
    this.bache = new Bache();
  }

  //metodo para guardar bache
  guardarBache() {
    //si la bandera es falsa, se guarda la usuario
    if (this.bandera == false) {
      this.bacheService.guardarBache(this.bache).subscribe((data: Bache) => {
        this.baches.push(data)
        this.bache = new Bache(); //limpiar el formulario
      });
    } else {
      //si la bandera es verdadera, se actualiza la usuario
      this.bacheService.actualizarBache(this.bache).subscribe((data: Bache) => {
        this.baches.push(data)
        this.bandera = false
      });
      this.bache = new Bache(); //limpiar el formulario
    }
  }

  //llamar a la funcion de tomar foto
  tomarFoto() {
    this.fotoService.addNewToGallery().then((data) => {
      this.foto = '';
      this.foto = 'data:image/' + data.format + ';base64,' + data.base64String + '';
      console.log(this.foto);
      this.bache.foto = this.foto;
    });
  }

  //llamar a la funcion de geolocalizacion
  geolocalizacion() {
    this.geolocalizazion.printCurrentPosition().then((data) => {
      this.latitud = data.coords.latitude;
      this.longitud = data.coords.longitude;
      //set tipo geometry for qgis
      //this.bache.posicion = 'POINT(' + this.longitud + ' ' + this.latitud + ')';
      this.bache.latitud = this.latitud;
      this.bache.longitud = this.longitud;
    });
  }

  //metodo para limpiar imagen y cordenadas despues de guardar
  limpiarImagen() {
    this.foto = '';
    this.latitud = 0;
    this.longitud = 0;
  }



}
