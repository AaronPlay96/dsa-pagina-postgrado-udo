import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {
  public user = ' ';
  public psw = ' ';
  constructor(private router: Router, private auth: AuthService) { }
  options = [
    { name: 'Estudiante', value: 1 },
    { name: 'Profesor', value: 2 },
    { name: 'Administrador', value: 3 }
  ];
  selectedOption: string;
  ngOnInit(): void {
  }
  iniciarSesion(form) {
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
    console.log(form.value);
  }
}
