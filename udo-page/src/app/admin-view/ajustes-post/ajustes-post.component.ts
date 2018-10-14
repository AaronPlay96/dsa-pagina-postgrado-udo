import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
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
  constructor(private formBuilder: FormBuilder, private crearserv: CrearpostgradoService) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      especialidad: ['', Validators.required],
    });
    this.myForm = this.formBuilder.group({
      materias: this.formBuilder.array([
        this.initMateria(),
      ])
    });
  }
  crearPostgrado() {
    this.crearserv.crear(this.firstFormGroup.value).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => { console.log(error); }
    );
  }
  initMateria() {
    return this.formBuilder.group({
        nombre: ['', Validators.required],
        codigo: ['', Validators.required],
        creditos: ['', Validators.required]
    });
  }
  addMateria() {
    // add address to the list
    const control = <FormArray>this.myForm.controls['materias'];
    control.push(this.initMateria());
  }
  removeMateria(i: number) {
    // remove address from the list
    const control = <FormArray>this.myForm.controls['materias'];
    control.removeAt(i);
  }
  save(model: Postgrado) {
    // call API to save customer
    console.log(this.myForm.value);
  }

}
