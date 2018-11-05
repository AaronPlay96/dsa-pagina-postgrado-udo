import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../../services/login-service.service';
import { EstudianteService } from '../../services/estudiante.service';
import {SelectionModel } from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import { PDFcreatorComponent } from 'src/app/pdfcreator/pdfcreator.component';


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
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {
  message;
  id_est;
  historico;

  PDF = new PDFcreatorComponent;
  // Tabla
  datasource;
  displayedColumns: string[] = ['nombre', 'nota', 'fecha'];
  selection = new SelectionModel<Historico>(allowMultiSelect, initialSelection);

  constructor(private data_serv: LoginServiceService, private est_serv: EstudianteService) { }

  ngOnInit() {
    this.data_serv.currentMessage.subscribe(message => this.message = message);
    console.log('mensaje');
    console.log(this.message);
    this.est_serv.getid(this.message.cedula).subscribe(
      (data: any) => {
        this.id_est = data;
        console.log('id estudiante');
        console.log(this.id_est.id_estudiante);
        this.est_serv.getHistorico(this.id_est.id_estudiante).subscribe(
          (data2: any) => {
            // console.log('historico');
            // console.log(this.historico);
            this.est_serv.getPensum(this.id_est.id_estudiante).subscribe(
              (data3: any) => {
                for (let i = 0; i < data3.list.length ; i++) {
                  data2.list.push(data3.list[i]);
                }
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
  guardarPDF() {
    this.PDF.captureScreen(document.getElementById('toPDF'));
  }
}
