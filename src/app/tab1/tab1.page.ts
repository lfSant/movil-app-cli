import { Component } from '@angular/core';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  usuario: Usuario = new Usuario();
  usuarios: Usuario[] = [];
  bandera: boolean = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarioService.usuarios().subscribe((data: Usuario[]) => {
      this.usuarios = data
    })
    this.usuario = new Usuario();
  }

  //Crud de Usuario
  //guardar usuario y actualizar
  guardarUsuario() {
    //si la bandera es falsa, se guarda la usuario
    if (this.bandera == false) {
      this.usuarioService.guardarUsuario(this.usuario).subscribe((data: Usuario) => {
        this.usuarios.push(data)
        this.usuario = new Usuario();
      });
    } else {
      //si la bandera es verdadera, se actualiza la usuario
      this.usuarioService.actualizarUsuario(this.usuario).subscribe((data: Usuario) => {
        this.usuarios.push(data)
        this.bandera = false
      });
      this.usuario = new Usuario();
      window.location.reload();
    }
  }

  //eliminar usuario
  eliminarUsuario(usuario: Usuario) {
    this.usuarioService.eliminarUsuario(usuario.id).subscribe((data: Usuario) => {
      this.usuarios = this.usuarios.filter(u => u !== usuario)
    });
  }

  //llamando a este metodo modifica la bandera para el metodo guardarusuario
  modificarUsuario(u: Usuario) {
    this.usuario = u
    this.bandera = true
  }
}
