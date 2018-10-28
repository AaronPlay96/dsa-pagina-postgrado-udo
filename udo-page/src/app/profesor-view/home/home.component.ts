import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  // selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message;
  constructor(private data_serv: LoginServiceService) {  }

  ngOnInit() {
    this.data_serv.currentMessage.subscribe(message => this.message = message);
  }

}
