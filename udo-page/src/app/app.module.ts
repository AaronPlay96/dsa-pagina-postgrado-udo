import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './login/header/header.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { FooterComponent } from './login/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { ProfesorViewComponent } from './profesor-view/profesor-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';

const appRoutes: Routes = [
  { path: '',component: LoginComponent},
  { path: 'student', component: StudentViewComponent },
  { path: 'profesor', component: ProfesorViewComponent },
  { path: 'admin', component: AdminViewComponent}
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
    AdminViewComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
