import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loginfo } from '../../services/loginfo';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {
  login = new Loginfo('', '');
  constructor(private router: Router, private loginserv: LoginService) { }
  options = [
    { name: 'Estudiante', value: 1 },
    { name: 'Profesor', value: 2 },
    { name: 'Administrador', value: 3 }
  ];
  selectedOption: string;
  ngOnInit(): void {
  }
  iniciarSesion(form) {
    this.loginserv.login(this.login).subscribe(
      (data: any) => {
        // log the employee object after the post is completed
        console.log(data);
        form.reset();
        if (this.selectedOption === 'Estudiante') {
          this.router.navigate(['/student']);
        } else if (this.selectedOption === 'Profesor') {
          this.router.navigate(['/profesor']);
        } else {
          this.router.navigate(['/admin']);
        }
      },
      (error: any) => { console.log(error); }
    );
    console.log(form.value);
  }
}
