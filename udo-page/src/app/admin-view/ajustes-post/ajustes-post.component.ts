import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ajustes-post',
  templateUrl: './ajustes-post.component.html',
  styleUrls: ['./ajustes-post.component.css']
})
export class AjustesPostComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      postgradoName: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
    });
  }

}
