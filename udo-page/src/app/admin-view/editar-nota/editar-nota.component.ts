import { Component, OnInit, ViewChild } from '@angular/core';
import { EstudianteService } from 'src/app/services/estudiante.service';
import {SelectionModel } from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatStepper} from '@angular/material';
import { ControlService } from 'src/app/services/control.service';
import { CapturaService } from 'src/app/services/captura.service';

export interface Historico {
  id_estudiante: number;
  id_materia: number;
  id_nota: number;
  nombre: string;
  nota: number;
  fecha_captura: number;
}

const initialSelection = [];
const allowMultiSelect = true;


@Component({
  selector: 'app-editar-nota',
  templateUrl: './editar-nota.component.html',
  styleUrls: ['./editar-nota.component.css']
})
export class EditarNotaComponent implements OnInit {
  estudiante = '';
  datasource;
  displayedColumns: string[] = ['nombre', 'nota', 'fecha'];
  selection = new SelectionModel<Historico>(allowMultiSelect, initialSelection);

  constructor(
    private est_serv: EstudianteService,
    private control_serv: ControlService,
    private captura_serv: CapturaService) { }
  @ViewChild('stepper') stepper: MatStepper;
  ngOnInit() {
  }
  buscar(ci: any) {
    console.log(ci);
    this.est_serv.getid(ci).subscribe(
      (data: any) => {
        this.estudiante = data;
        console.log('id estudiante');
        console.log(this.estudiante);
        this.est_serv.getHistorico(data.id_estudiante).subscribe(
          (data2: any) => {
            // console.log('historico');
            // console.log(this.historico);
            this.est_serv.getPensum(data.id_estudiante).subscribe(
              (data3: any) => {
                for (let i = 0; i < data3.list.length ; i++) {
                  data2.list.push(data3.list[i]);
                }
                this.stepper.next();
                this.datasource = new MatTableDataSource<Historico>(data2.list);
                // console.log(data2.list);
              },
              (error: any) => { console.log('error ' + error); }
            );
          },
          (error: any) => { console.log('error ' + error); }
        );
      },
      (error: any) => { console.log('error ' + error); }
    );
  }
  actualizarNota(idmat: any, nota: any, id: any) {
    const json = '{"id_estudiante":' + id + ',"id_materia":' + idmat + ',"nota":' + nota + ',"fecha_captura":0}';
    this.captura_serv.cargarnota2(json).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => { console.log('error ' + error); }
    );
  }
}
