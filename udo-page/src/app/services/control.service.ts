import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  constructor(public http: HttpClient) { }
  obtener_cohortes(): Observable<any> {
    const url = 'http://localhost:5000/';
    return this.http.get(url + 'admin/cohorte_get', httpOptions);
  }
  obtener_materias(x: number): Observable<any> {
    const json = '{"id_postgrado":' + x + '}';
    console.log(json);
    const url = 'http://localhost:5000/';
    return this.http.post(url + 'admin/materias_get', json, httpOptions);
  }
  obtener_profesores(): Observable<any> {
    const url = 'http://localhost:5000/';
    return this.http.get(url + 'admin/profesores_get', httpOptions);
  }
  crearControl(infor: any): Observable<any> {
    const json = JSON.stringify(infor);
    console.log(json);
    const url = 'http://localhost:5000/';
    return this.http.post(url + 'admin/control', json, httpOptions);
  }
  habilitar(infor: any) {
    const json = '{"id_control":' + JSON.stringify(infor) + '}';
    console.log(json);
    const url = 'http://localhost:5000/';
    return this.http.post(url + 'admin/control_captura', json, httpOptions);
  }
}

