import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loginfo } from '../../services/loginfo';
import { LoginService } from '../../services/login.service';
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {
  login = new Loginfo('', '', 0);
  message: string;
  respuesta;
  fecha: number = Date.now();
  constructor(private router: Router, private loginserv: LoginService, private data_serv: LoginServiceService) { }
  options = [
    { name: 'Estudiante', value: 1 },
    { name: 'Profesor', value: 2 },
    { name: 'Administrador', value: 3 }
  ];
  selectedOption: string;
  ngOnInit(): void {
    console.log('fecha ');
    console.log(this.fecha);
  }
  iniciarSesion(form) {
    this.loginserv.login(this.login).subscribe(
      (data: any) => {
        // log the employee object after the post is completed
        console.log(data.cedula);
        this.message = data;
        this.data_serv.currentMessage.subscribe(message => this.message = message);
        this.data_serv.changeMessage(data);
        console.log('login ' + this.login.type);
        if (this.login.type === 1) {
          this.router.navigate(['/student']);
        } else if (this.login.type === 2) {
          this.router.navigate(['/profesor']);
        } else {
          this.router.navigate(['/admin']);
        }
      },
      (error: any) => { this.respuesta = error.error.text + this.options[this.login.type - 1].name; }
    );
    console.log(form.value);
  }
}
