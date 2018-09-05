import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorViewComponent } from './profesor-view.component';

describe('ProfesorViewComponent', () => {
  let component: ProfesorViewComponent;
  let fixture: ComponentFixture<ProfesorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
