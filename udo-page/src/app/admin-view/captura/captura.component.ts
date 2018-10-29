import { Component, OnInit } from '@angular/core';
import { CapturaService } from '../../services/captura.service';
import {SelectionModel } from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import { FormGroup } from '@angular/forms';
import { ControlService } from '../../services/control.service';

export interface Control {
  especialidad: string;
  seccion: number;
  nombre_materia: string;
  id_profesor: number;
  nombre: string;
  apellido: string;
}

const initialSelection = [];
const allowMultiSelect = true;

@Component({
  selector: 'app-captura',
  templateUrl: './captura.component.html',
  styleUrls: ['./captura.component.css']
})
export class CapturaComponent implements OnInit {
  datasource;
  materiasFormGroup: FormGroup;
  displayedColumns: string[] = ['select', 'espec', 'seccion', 'materia', 'id_prof', 'prof'];
  selection = new SelectionModel<Control>(allowMultiSelect, initialSelection);
  constructor(private captura_serv: CapturaService, private apert_serv: ControlService) { }
  lista;
  ngOnInit() {
    this.captura_serv.obtener().subscribe(
      (data: any) => {
        this.lista = data.list;
        console.log(this.lista);
        this.datasource = new MatTableDataSource<Control>(this.lista);
      },
      (error: any) => { console.log('error ' + error); }
    );
  }
  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
  on_off(row: any) {
    console.log(row.id_control);
    // estado ? this.selection.toggle(row) : null;
    this.apert_serv.habilitar(row.id_control).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => { console.log('error ' + error); }
    );
  }
}
