import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesPostComponent } from './ajustes-post.component';

describe('AjustesPostComponent', () => {
  let component: AjustesPostComponent;
  let fixture: ComponentFixture<AjustesPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjustesPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
