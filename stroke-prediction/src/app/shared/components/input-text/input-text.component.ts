import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { InputFieldDirective } from "../../../core/directives/input.field.directive";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent extends InputFieldDirective implements OnInit {

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  ngOnInit(): void {
  }

}
