import { NgModule } from '@angular/core';
import { InputTextComponent } from './components/input-text/input-text.component';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SelectComponent } from './components/select/select.component';

@NgModule({
  declarations: [
    InputTextComponent,
    SelectComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [
    InputTextComponent,
    SelectComponent,
  ]
})
export class SharedModule { }
