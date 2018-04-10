import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FacebookModule } from 'ngx-facebook';


import { AppComponent } from './app.component';
import { FbappComponent } from './fbapp/fbapp.component';


@NgModule({
  declarations: [
    AppComponent,
    FbappComponent
  ],
  imports: [
    BrowserModule,
    FacebookModule.forRoot(),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
