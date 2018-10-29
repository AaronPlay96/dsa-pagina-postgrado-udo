import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { LoginService } from './services/login.service';
import { CrearpostgradoService } from './services/Crearpostgrado.service';
import { RegistrarService } from './services/registrar.service';
import { AperturaService } from './services/apertura.service';
import { LoginServiceService } from './services/login-service.service';
import { CapturaService } from './services/captura.service';
import { ControlService } from './services/control.service';
/*import { MAT_DATE_FORMATS } from '@angular/material';
import { APP_DATE_FORMATS } from './date';
import { AppDateAdapter } from './date';*/


import { AppComponent } from './app.component';
import { HeaderComponent } from './login/header/header.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { FooterComponent } from './login/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { ProfesorViewComponent } from './profesor-view/profesor-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { HomeComponent } from './profesor-view/home/home.component';
import { NotasComponent } from './profesor-view/notas/notas.component';
import { AjustesComponent } from './profesor-view/ajustes/ajustes.component';
import { HomeComponent_admin } from './admin-view/home/home.component';
import { RegistroComponent} from './admin-view/registro/registro.component';
import { AjustesPostComponent } from './admin-view/ajustes-post/ajustes-post.component';
import { AperturaComponent } from './admin-view/apertura/apertura.component';
import { CapturaComponent} from './admin-view/captura/captura.component';
import { ControlComponent } from './admin-view/control/control.component';
import { HistoricoComponent } from './student-view/historico/historico.component';
import { PDFcreatorComponent } from './pdfcreator/pdfcreator.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'student',
    component: StudentViewComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent },
      { path: 'historico', component: HistoricoComponent },
    ]
  },
  { path: 'profesor',
    component: ProfesorViewComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent },
      { path: 'cargaNotas', component: NotasComponent },
      { path: 'ajustes', component: AjustesComponent },
    ]
  },
  { path: 'admin', component: AdminViewComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent_admin },
      { path: 'registro', component: RegistroComponent },
      { path: 'ajustes_post', component: AjustesPostComponent },
      { path: 'apertura', component: AperturaComponent },
      { path: 'control', component: ControlComponent },
      { path: 'captura', component: CapturaComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    FooterComponent,
    LoginComponent,
    StudentViewComponent,
    ProfesorViewComponent,
    AdminViewComponent,
    HomeComponent,
    NotasComponent,
    AjustesComponent,
    HomeComponent_admin,
    RegistroComponent,
    AjustesPostComponent,
    AperturaComponent,
    CapturaComponent,
    ControlComponent,
    HistoricoComponent,
    PDFcreatorComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule, FormsModule, BrowserAnimationsModule, MaterialModule, ReactiveFormsModule
  ],
  providers: [
    LoginService,
    CrearpostgradoService,
    RegistrarService,
    CapturaService,
    AperturaService,
    LoginServiceService,
    ControlService
    /*{
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
