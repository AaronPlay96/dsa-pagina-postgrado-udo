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
export class EstudianteService {

  constructor(public http: HttpClient) { }
  getid(cedula: any) {
    const json = '{"cedula":' + JSON.stringify(cedula) + '}';
    console.log('cedula: ' + json);
    const url = 'http://localhost:5000/';
    return this.http.post(url + 'student/estudiante', json, httpOptions);
  }
  getHistorico(id: any) {
    const json = JSON.stringify(id);
    console.log('id: ' + json);
    const url = 'http://localhost:5000/';
    return this.http.post(url + 'student/notas', json, httpOptions);
  }
}

