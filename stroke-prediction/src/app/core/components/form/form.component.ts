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
  formWeights: FormGroup;

  @Output() formSubmit: EventEmitter<Record>;

  constructor(private formBuilder: FormBuilder, public storeService: StoreService) {
    this.formSubmit = new EventEmitter<Record>();

    this.form = this.formBuilder.group({
      gender: [null, Validators.required],
      age: [null, Validators.required],
      hypertension: [null, Validators.required],
      heartDisease: [null, Validators.required],
      avgGlucoseLevel: [null, Validators.required],
      weight: [null, Validators.required],
      height: [null, Validators.required],
      smokingStatus: [null, Validators.required],
    });

    const weight = {...(this.storeService.weights$.getValue())};

    Object.keys(weight)
      .forEach((key) => {
        (weight as any)[key] = [(weight as any)[key], Validators.required]
      });

    this.formWeights = this.formBuilder.group(weight);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.form.updateValueAndValidity();
      this.formWeights.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.form.valid && this.formWeights.valid) {
      let object = this.form.getRawValue();
      const bmi = object.weight / (object.height * object.height);
      const record: Record = {...object, bmi: parseFloat((bmi).toFixed(1))};
      this.formSubmit.next(record);
      this.storeService.weights$.next(this.formWeights.getRawValue());
    }
  }

  onReset(): void {
    this.formWeights.patchValue(this.storeService.weights$.getValue());
  }

}
