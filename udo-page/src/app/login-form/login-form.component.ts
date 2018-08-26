import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public user = ' ';
  public psw = ' ';
  constructor() { }

  ngOnInit() {
  }
  iniciarSesion(usuario: string, clave: string) {
    if (usuario) {
      this.user = usuario;
    }
    if (clave) {
      this.psw = clave;
    }
    console.log(this.user);
    console.log(this.psw);
  }

}
