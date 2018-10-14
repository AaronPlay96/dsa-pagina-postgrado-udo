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
export class RegistrarService {

  constructor(public http: HttpClient) { }
  registro(infor: any): Observable<any> {
    const json = JSON.stringify(infor);
    console.log('json' + json);
    const url = 'http://localhost:5000/';
    return this.http.post(url + 'admin/register', json, httpOptions);
  }
}

