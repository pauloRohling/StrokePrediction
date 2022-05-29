import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "./shared/shared.module";
import { FormComponent } from "./core/components/form/form.component";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './core/components/home/home.component';
import { WeightComponent } from './core/components/weight/weight.component';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HomeComponent,
    WeightComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxDatatableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
