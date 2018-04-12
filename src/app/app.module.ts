import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FacebookModule } from 'ngx-facebook';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ApiServiceService } from '../providers/api-service/api-service.service'
import { DatabaseService } from '../providers/database-service/database.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FacebookModule.forRoot(),
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiServiceService,
    DatabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
