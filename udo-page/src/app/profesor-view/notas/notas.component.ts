import { Component, OnInit, ViewChild } from '@angular/core';
import { CapturaService } from '../../services/captura.service';
import { LoginServiceService } from '../../services/login-service.service';
import {SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import {MatStepper} from '@angular/material';
import {MatTableDataSource} from '@angular/material';

export class Idprof {
  id_profesor: string;
}

export interface Estudiante {
  apellido_est: string;
  cedula: string;
  id_cohorte: number;
  id_estudiante: number;
  nombre_est: string;
}

const initialSelection = [];
const allowMultiSelect = true;

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  message: string;
  idprof = new Idprof();
  estudiantes;
  selected;
  respuesta;
  materiasFormGroup: FormGroup;
  estudiantesFormGroup: FormGroup;
  datasource;
  displayedColumns: string[] = ['select', 'id', 'nombre', 'apellido', 'cedula'];
  selection = new SelectionModel<Estudiante>(allowMultiSelect, initialSelection);
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
    this.materiasFormGroup.controls['id_cohorte'].setValue(this.selected.id_cohorte);
    this.captura_serv.pedirEst(this.materiasFormGroup.value).subscribe(
      (data: any) => {
        console.log(data.list);
        this.estudiantes = data.list;
        this.datasource = new MatTableDataSource<Estudiante>(data.list);
        this.stepper.next();
        this.addMateria();
      },
      (error: any) => { console.log('error ' + error); }
    );
  }
  initMateria(id_estudiante) {
    return this.formBuilder.group({
        id_estudiante: [id_estudiante, ],
        id_materia: [this.selected.id_materia, ],
        nota: ['', Validators.required]
    });
  }
  addMateria() {
    // add address to the list
    const control = <FormArray>this.estudiantesFormGroup.controls['list'];
    for (let i = 0; i < this.estudiantes.length ; i++) {
      control.push(this.initMateria(this.estudiantes[i].id_estudiante));
    }
    // console.log(this.estudiantesFormGroup.value);
  }
  cargarnota() {
    console.log(this.estudiantesFormGroup.value);
    this.captura_serv.cargarnota(this.estudiantesFormGroup.value).subscribe(
      (data: any) => {
        console.log(data);
        this.respuesta = data.respuesta;
      },
      (error: any) => { console.log('error ' + error); }
    );
  }
}
