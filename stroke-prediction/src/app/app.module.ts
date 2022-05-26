import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './core/form/form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    FormComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
