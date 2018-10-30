import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {
  message;
  constructor(private data_serv: LoginServiceService, private router: Router) { }

  ngOnInit() {
    this.data_serv.currentMessage.subscribe(message => this.message = message);
    console.log(this.message);
    if (this.message === 'default message') {
      this.router.navigate(['']);
    }
  }

}
