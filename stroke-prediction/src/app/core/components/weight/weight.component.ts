import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-weights",
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit {

  @Input() form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit(): void {
  }

}
