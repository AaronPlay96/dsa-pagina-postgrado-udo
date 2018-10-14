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
export class CrearpostgradoService {

  constructor(public http: HttpClient) { }
  crear(nombre: any): Observable<any> {
    const json = JSON.stringify(nombre);
    console.log(json);
    const url = 'http://localhost:5000/';
    return this.http.post(url + 'admin/postgrado', json, httpOptions);
  }
}
