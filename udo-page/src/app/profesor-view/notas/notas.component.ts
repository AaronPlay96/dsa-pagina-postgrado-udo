import { Component, OnInit, ViewChild } from '@angular/core';
import { CapturaService } from '../../services/captura.service';
import { LoginServiceService } from '../../services/login-service.service';
import {SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import {MatStepper} from '@angular/material';

export class Idprof {
  id_profesor: string;
}

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  message: string;
  idprof = new Idprof();
  estudiantes;

  materiasFormGroup: FormGroup;
  estudiantesFormGroup: FormGroup;
  constructor(
    private captura_serv: CapturaService,
    private data_serv: LoginServiceService,
    private formBuilder: FormBuilder) { }
  lista;
  @ViewChild('stepper') stepper: MatStepper;
  ngOnInit() {
    this.materiasFormGroup = this.formBuilder.group({
      id_cohorte: ['', Validators.required]
    });
    this.estudiantesFormGroup = this.formBuilder.group({
      list: this.formBuilder.array([
      ])
    });
    this.data_serv.currentMessage.subscribe(message => this.message = message);
    console.log('cedula: ' + this.message);
    this.idprof.id_profesor = this.message;
    this.captura_serv.profesor_obtener(this.idprof).subscribe(
      (data: any) => {
        this.lista = data.list;
        console.log(this.lista);
      },
      (error: any) => { console.log('error ' + error); }
    );
  }
  pedirEstudiantes() {
    this.captura_serv.pedirEst(this.materiasFormGroup.value).subscribe(
      (data: any) => {
        console.log(data.list);
        this.estudiantes = data.list;
        this.stepper.next();
      },
      (error: any) => { console.log('error ' + error); }
    );
  }
}
