import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { InputFieldDirective } from "../../../core/directives/input.field.directive";
import { FormBuilder } from "@angular/forms";
import { IDataItem } from "../../../core/model/data.item.interface";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends InputFieldDirective implements OnInit {

  @Input() data: Array<IDataItem>;

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
    this.data = [];
  }

  ngOnInit(): void {
  }

}
