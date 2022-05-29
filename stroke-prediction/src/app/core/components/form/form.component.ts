import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IDataItem } from "../../model/data.item.interface";
import { Record } from "../../model/record";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-form",
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  genders: Array<IDataItem>;
  yesNo: Array<IDataItem>;
  smoking: Array<IDataItem>;

  @Output() formSubmit: EventEmitter<Record>;

  constructor(private formBuilder: FormBuilder) {
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

    // this.form = this.formBuilder.group({
    //   gender: [0, Validators.required],
    //   age: [67, Validators.required],
    //   hypertension: [false, Validators.required],
    //   heartDisease: [true, Validators.required],
    //   avgGlucoseLevel: [228.69, Validators.required],
    //   weight: [82.4, Validators.required],
    //   height: [1.5, Validators.required],
    //   smokingStatus: [2, Validators.required],
    // });

    this.genders = [
      { id: 0, display: "Masculino" },
      { id: 1, display: "Feminino" },
      { id: 2, display: "Outro" },
    ];

    this.yesNo = [
      { id: true, display: "Sim" },
      { id: false, display: "Não" },
    ];

    this.smoking = [
      { id: 0, display: "Não sei" },
      { id: 1, display: "Não-fumante" },
      { id: 2, display: "Ex-fumante" },
      { id: 3, display: "Fumante" },
    ];
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.valid) {
      let object = this.form.getRawValue();
      const record: Record = {...object, bmi: object.weight / (object.height * object.height)};
      this.formSubmit.next(record);
    }
  }

}
