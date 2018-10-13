import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loginfo } from './loginfo';

const httpOptions = {
  headers: new HttpHeaders({
    // 'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(public http: HttpClient) { }
  login(infor: Loginfo): Observable<any> {
    const json = JSON.stringify(infor);
    console.log(json);
    const url = 'http://localhost:5000/';
    return this.http.post(url + 'login/auth', json, httpOptions);
  }
}
