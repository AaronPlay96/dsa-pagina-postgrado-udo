import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AperturaService {

  constructor(public http: HttpClient) { }
  apertura(): Observable<any> {
    const url = 'http://localhost:5000/';
    return this.http.get(url + 'admin/cohorte_post', httpOptions);
  }
  crearCohorte(nombre: any): Observable<any> {
    const json = JSON.stringify(nombre);
    console.log('json' + json);
    const url = 'http://localhost:5000/';
    return this.http.post(url + 'admin/cohorte', json, httpOptions);
  }
  obtenerEstudiantes(): Observable<any> {
    const url = 'http://localhost:5000/';
    return this.http.get(url + 'admin/cohorte', httpOptions);
  }
  inscribir(listado: any): Observable<any> {
    const json = JSON.stringify(listado);
    console.log('json' + json);
    const url = 'http://localhost:5000/';
    return this.http.post(url + 'admin/estudiantes', json, httpOptions);
  }
  // repetido
  cargarnota(message: any) {
    const json = JSON.stringify(message);
    console.log('json ' + json);
    const url = 'http://localhost:5000/';
    return this.http.post(url + 'profesor/notas', json, httpOptions);
  }
}
