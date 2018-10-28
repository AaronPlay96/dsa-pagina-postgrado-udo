import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material';
import { Postgrado } from './postgrado.interface';
import { CrearpostgradoService } from '../../services/Crearpostgrado.service';


@Component({
  selector: 'app-ajustes-post',
  templateUrl: './ajustes-post.component.html',
  styleUrls: ['./ajustes-post.component.css']
})
export class AjustesPostComponent implements OnInit {
  firstFormGroup: FormGroup;
  myForm: FormGroup;
  existe = false;
  id_ultimo: number;
  respuesta: string;
  constructor(private formBuilder: FormBuilder, private crearserv: CrearpostgradoService) { }

  @ViewChild('stepper') stepper: MatStepper;
  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      especialidad: ['', Validators.required],
    });
    this.myForm = this.formBuilder.group({
      list: this.formBuilder.array([
      ])
    });
  }
  crearPostgrado() {
    this.crearserv.crear(this.firstFormGroup.value).subscribe(
      (data: any) => {
        console.log(data);
        this.id_ultimo = data.id_ultimo;
        console.log(this.id_ultimo);
        this.existe = false;
        this.stepper.next();
        this.addMateria();
      },
      (error: any) => { console.log('error ' + error); this.existe = true; }
    );
  }
  crearPensum() {
    this.crearserv.crearPensum(this.myForm.value).subscribe(
      (data: any) => {
        console.log(data);
        this.respuesta = data.respuesta;
      },
      (error: any) => { console.log('error ' + error); this.existe = true; }
    );
  }
  initMateria() {
    return this.formBuilder.group({
        id_postgrado: [this.id_ultimo, ],
        nombre: ['', Validators.required],
        codigo: ['', Validators.required],
        creditos: ['', Validators.required]
    });
  }
  addMateria() {
    // add address to the list
    const control = <FormArray>this.myForm.controls['list'];
    control.push(this.initMateria());
  }
  removeMateria(i: number) {
    // remove address from the list
    const control = <FormArray>this.myForm.controls['list'];
    control.removeAt(i);
  }
  save(model: number) {
    // call API to save customer
    console.log(JSON.stringify(this.myForm.value));
  }

}
