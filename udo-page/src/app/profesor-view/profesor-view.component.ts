import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-profesor-view',
  templateUrl: './profesor-view.component.html',
  styleUrls: ['./profesor-view.component.css']
})
export class ProfesorViewComponent implements OnInit {
  message: string;
  constructor(private data: LoginServiceService) { }
  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    console.log('cedula: ' + this.message);
  }
}
