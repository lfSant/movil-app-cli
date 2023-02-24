import { Component } from '@angular/core';
import { FotoService } from '../service/foto.service';
import { GeolocalizacionService } from '../service/geolocalizacion.service';
import { BacheService } from '../service/bache.service';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuario';
import { Bache } from '../model/bache';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


  constructor(private fotoService: FotoService, private geolocalizazion: GeolocalizacionService, private bacheService: BacheService, private usuarioService: UsuarioService) { }

  foto: string = '';
  latitud: number = 0;
  longitud: number = 0;
  usuarioSeleccionado: Usuario = new Usuario();

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

  //metodo para eliminar bache
  eliminarBache(bache: Bache) {
    this.bacheService.eliminarBache(bache.id).subscribe((data: Bache) => {
      this.baches = this.baches.filter(u => u !== bache)
    });
  }
}
