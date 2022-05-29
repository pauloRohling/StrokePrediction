import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Record } from "../../model/record";
import { StoreService } from "../../services/store.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-form",
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;

  @Output() formSubmit: EventEmitter<Record>;

  constructor(private formBuilder: FormBuilder, public storeService: StoreService) {
    this.formSubmit = new EventEmitter<Record>();

    // this.form = this.formBuilder.group({
    //   gender: [null, Validators.required],
    //   age: [null, Validators.required],
    //   hypertension: [null, Validators.required],
    //   heartDisease: [null, Validators.required],
    //   avgGlucoseLevel: [null, Validators.required],
    //   weight: [null, Validators.required],
    //   height: [null, Validators.required],
    //   smokingStatus: [null, Validators.required],
    // });

    this.form = this.formBuilder.group({
      gender: [0, Validators.required],
      age: [67, Validators.required],
      hypertension: [false, Validators.required],
      heartDisease: [true, Validators.required],
      avgGlucoseLevel: [228.69, Validators.required],
      weight: [82.4, Validators.required],
      height: [1.5, Validators.required],
      smokingStatus: [2, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.valid) {
      let object = this.form.getRawValue();
      const bmi = object.weight / (object.height * object.height);
      const record: Record = {...object, bmi: parseFloat((bmi).toFixed(1))};
      this.formSubmit.next(record);
    }
  }

}
