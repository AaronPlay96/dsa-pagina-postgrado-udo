import { Component, OnInit } from '@angular/core';
import { Registro } from './registro';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  constructor() { }
  profsel = false;
  estsel = false;
  tipo: string = null;
  selectedOption = null;
  title = '';
  passwordConfirmationFailed = false;
  passwordConfirmationTxt = '';
  signup = new Registro('', '', '', '', '', '');
  titulos_pregrado = ['Ingenieria en Computacion', 'Ingenieria en Sistemas', 'Ingenieria Civil', 'Ingenieria Industrial', 'Medicina'];
  confirmPassword() {
    if (this.signup.password === this.passwordConfirmationTxt) {
      this.passwordConfirmationFailed = false;
    } else {
      this.passwordConfirmationFailed = true;
    }
  }
  onSubmit(form) {
    console.log(form.value);
    form.reset();
  }

}
