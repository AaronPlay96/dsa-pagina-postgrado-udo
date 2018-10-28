import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../../services/login-service.service';
import { EstudianteService } from '../../services/estudiante.service';
import {SelectionModel } from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';


export interface Historico {
  id_estidiante: number;
  id_materia: number;
  id_nota: number;
  nombre: string;
  nota: number;
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

  // Tabla
  datasource;
  displayedColumns: string[] = ['nombre', 'nota'];
  selection = new SelectionModel<Historico>(allowMultiSelect, initialSelection);

  constructor(private data_serv: LoginServiceService, private est_serv: EstudianteService) { }

  ngOnInit() {
    this.data_serv.currentMessage.subscribe(message => this.message = message);
    console.log(this.message);
    this.est_serv.getid(this.message.cedula).subscribe(
      (data: any) => {
        this.id_est = data;
        console.log(this.id_est);
        this.est_serv.getHistorico(this.id_est).subscribe(
          (data2: any) => {
            this.historico = data2;
            this.datasource = new MatTableDataSource<Historico>(data2.list);
            console.log(this.historico);
          },
          (error: any) => { console.log('error ' + error); }
        );
      },
      (error: any) => { console.log('error ' + error); }
    );
  }

}
