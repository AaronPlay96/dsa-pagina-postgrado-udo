import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesor-view',
  templateUrl: './profesor-view.component.html',
  styleUrls: ['./profesor-view.component.css']
})
export class ProfesorViewComponent implements OnInit {
  message;
  constructor(private data: LoginServiceService, private router: Router) { }
  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    console.log('cedula: ' + this.message);
    if (this.message === 'default message') {
      this.router.navigate(['']);
    }
  }
}
