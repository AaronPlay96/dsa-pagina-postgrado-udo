import { Component, OnInit } from '@angular/core';
import { CapturaService } from '../../services/captura.service';

@Component({
  selector: 'app-captura',
  templateUrl: './captura.component.html',
  styleUrls: ['./captura.component.css']
})
export class CapturaComponent implements OnInit {

  constructor(private captura_serv: CapturaService) { }
  lista;
  ngOnInit() {
    this.captura_serv.obtener().subscribe(
      (data: any) => {
        this.lista = data;
        console.log(this.lista);
      },
      (error: any) => { console.log('error ' + error); }
    );
  }

}
