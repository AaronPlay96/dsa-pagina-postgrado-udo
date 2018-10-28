import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
  controlFormGroup: FormGroup;
  list_cohorte;
  id_postgrado;
  list_materias;
  list_prof;
  selected;
  respuesta;
  constructor(private formBuilder: FormBuilder, private apert_serv: ControlService) { }

  ngOnInit() {
    this.controlFormGroup = this.formBuilder.group({
      id_cohorte: ['', Validators.required],
      id_materia: ['', Validators.required],
      id_profesor: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      captura: [false, Validators.required]
    });
    this.apert_serv.obtener_cohortes().subscribe(
      (data: any) => {
        this.list_cohorte = data.list;
        console.log(this.list_cohorte);
      },
      (error: any) => { console.log('error ' + error); }
    );
  }
  obtener_materias() {
    console.log(this.selected);
    this.controlFormGroup.value.id_cohorte = this.selected.id_cohorte;
    this.controlFormGroup.controls['id_cohorte'].setValue(this.selected.id_cohorte);
    console.log(this.controlFormGroup.value.id_cohorte);
    this.apert_serv.obtener_materias(this.selected.id_postgrado).subscribe(
      (data: any) => {
        this.list_materias = data.list;
        console.log(this.list_materias);
      },
      (error: any) => { console.log('error ' + error); }
    );
  }
  obtener_profesores() {
    this.apert_serv.obtener_profesores().subscribe(
      (data: any) => {
        this.list_prof = data.list;
        console.log(this.list_prof);
      },
      (error: any) => { console.log('error ' + error); }
    );
  }
  crearControl() {
    console.log(JSON.stringify(this.controlFormGroup.value));
    this.apert_serv.crearControl(this.controlFormGroup.value).subscribe(
      (data: any) => {
        this.list_prof = data.list;
        console.log(this.list_prof);
        this.controlFormGroup.reset();
        this.respuesta = 'Control creado exitosamente';
      },
      (error: any) => { console.log('error ' + error); }
    );
  }

}
