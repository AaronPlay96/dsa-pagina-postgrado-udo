import { Component, OnInit, ViewChild } from '@angular/core';
import { Apertura } from './apertura';
import { AperturaService } from '../../services/apertura.service';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {SelectionModel } from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';

export interface Estudiante {
  apellido: string;
  cedula: number;
  nombre: string;
}

const initialSelection = [];
const allowMultiSelect = true;

@Component({
  selector: 'app-apertura',
  templateUrl: './apertura.component.html',
  styleUrls: ['./apertura.component.css'],
})
export class AperturaComponent implements OnInit {
  apertura = new Apertura();
  cohorteFormGroup: FormGroup;
  estudiantesFormGroup: FormGroup;
  id_cohorte;
  list_post;
  list_est;
  datasource;
  respuesta;
  displayedColumns: string[] = ['select', 'name', 'lastname', 'cedula'];
  selection = new SelectionModel<Estudiante>(allowMultiSelect, initialSelection);
  constructor(private apert_serv: AperturaService, private formBuilder: FormBuilder) { }

  @ViewChild('stepper') stepper: MatStepper;
  ngOnInit() {
    this.cohorteFormGroup = this.formBuilder.group({
      id_postgrado: ['', Validators.required],
      year: ['', Validators.required],
      seccion: ['', Validators.required]
    });
    this.estudiantesFormGroup = this.formBuilder.group({
      list: this.formBuilder.array([
      ])
    });
    this.apert_serv.apertura().subscribe(
      (data: any) => {
        this.list_post = data.list;
        console.log(this.list_post);
      },
      (error: any) => { console.log('error ' + error); }
    );
  }
  crearCohorte() {
    this.apert_serv.crearCohorte(this.cohorteFormGroup.value).subscribe(
      (data: any) => {
        console.log(data);
        this.id_cohorte = data.id_ultimo;
        console.log(this.id_cohorte);
        // this.existe = false;
        this.stepper.next();
        this.pedirEstudiantes();
      },
      (error: any) => { console.log('error ' + error); /*this.existe = true;*/ }
    );
  }
  pedirEstudiantes() {
    this.apert_serv.obtenerEstudiantes().subscribe(
      (data: any) => {
        this.list_est = data.list;
        console.log(this.list_est);
        this.datasource = new MatTableDataSource<Estudiante>(this.list_est);
      },
      (error: any) => { console.log('error ' + error); }
    );
  }
  inscribirEstudiates() {
    console.log(this.selection.selected);
    this.selection.selected.forEach(element => {
      this.addEstudiante(element.cedula);
    });
    this.apert_serv.inscribir(this.estudiantesFormGroup.value).subscribe(
      (data: any) => {
        console.log(data.respuesta);
        this.respuesta = data.respuesta;
      },
      (error: any) => { console.log('error ' + error); }
    );
  }
  initEstudiante(cedula: number) {
    return this.formBuilder.group({
        cedula: [cedula, Validators.required],
        id_cohorte: [this.id_cohorte, ],
    });
  }
  addEstudiante(cedula: number) {
    // add address to the list
    const control = <FormArray>this.estudiantesFormGroup.controls['list'];
    control.push(this.initEstudiante(cedula));
  }
  removeMateria(i: number) {
    // remove address from the list
    const control = <FormArray>this.estudiantesFormGroup.controls['list'];
    control.removeAt(i);
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.datasource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.datasource.data.forEach(row => this.selection.select(row));
  }
}
