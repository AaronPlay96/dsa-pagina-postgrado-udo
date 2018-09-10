import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {
  public user = ' ';
  public psw = ' ';
  selectedOption: string;
  constructor(private router: Router) { }
  options = [
    { name: 'Estudiante', value: 1 },
    { name: 'Profesor', value: 2 },
    { name: 'Administrador', value: 3 }
  ];

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
    console.log(this.selectedOption);
    if (this.selectedOption === 'Estudiante') {
      this.router.navigate(['/student']);
    } else if (this.selectedOption === 'Profesor') {
      this.router.navigate(['/profesor']);
    } else {
      this.router.navigate(['/admin']);
    }
  }
}
