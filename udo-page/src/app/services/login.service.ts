import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loginfo } from './loginfo';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(public http: HttpClient) { }
  login(infor: Loginfo): Observable<any> {
    const json = JSON.stringify(infor);
    // El backend recogerá un parametro json
    const params = 'json=' + json;
    const url = 'http://localhost:5000';
    // Establecemos cabeceras
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(url + 'auth', params, {headers: headers});
}
}
