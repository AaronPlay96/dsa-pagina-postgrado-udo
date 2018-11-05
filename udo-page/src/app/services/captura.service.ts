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
export class CapturaService {

  constructor(public http: HttpClient) { }
  obtener(): Observable<any> {
    const url = 'http://localhost:5000/';
    return this.http.get(url + 'admin/control', httpOptions);
  }
  profesor_obtener(message: any): Observable<any> {
    const json = JSON.stringify(message);
    console.log('json ' + json);
    const url = 'http://localhost:5000/';
    return this.http.post(url + 'profesor/control', json, httpOptions);
  }
  pedirEst(message: any): Observable<any> {
    const json = JSON.stringify(message);
    console.log('json ' + json);
    const url = 'http://localhost:5000/';
    return this.http.post(url + 'profesor/estudiante', json, httpOptions);
  }
  cargarnota(message: any) {
    const json = JSON.stringify(message);
    console.log('json ' + json);
    const url = 'http://localhost:5000/';
    return this.http.post(url + 'profesor/notas', json, httpOptions);
  }
  cargarnota2(json: any) {
    const url = 'http://localhost:5000/';
    return this.http.post(url + 'admin/notas_modificar', json, httpOptions);
  }
}

