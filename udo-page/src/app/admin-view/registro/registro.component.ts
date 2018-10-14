import { Component, OnInit } from '@angular/core';
import { Registro } from './registro';
import {RegistrarService} from '../../services/registrar.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  constructor(private registrarserv: RegistrarService) { }
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
    if (this.signup.clave === this.passwordConfirmationTxt) {
      this.passwordConfirmationFailed = false;
    } else {
      this.passwordConfirmationFailed = true;
    }
  }
  onSubmit(form) {
    this.registrarserv.registro(this.signup).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => { console.log('error ' + error); }
    );
  }
}
