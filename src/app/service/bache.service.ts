import { Injectable } from '@angular/core';
import { Bache } from '../model/bache';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BacheService {

  private urlEndPoint: string = 'http://localhost:8080/api';

  constructor(private http : HttpClient) { }

  //listar usuarios
  baches(): Observable<Bache[]> {
    return this.http.get<Bache[]>(`${this.urlEndPoint}/baches`);
  }

  //guardar usuario
  guardarBache(bache: Bache): Observable<Bache> {
    return this.http.post<Bache>(`${this.urlEndPoint}/guardarbache`, bache);
  }

  //eliminar usuario
  eliminarBache(id: number): Observable<Bache> {
    return this.http.delete<Bache>(`${this.urlEndPoint}/eliminarbache/${id}`);
  }

  //actualizar usuario
  actualizarBache(bache: Bache): Observable<Bache> {
    return this.http.put<Bache>(`${this.urlEndPoint}/actualizarbache`, bache);
  }


}
