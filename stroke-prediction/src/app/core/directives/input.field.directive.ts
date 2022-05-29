import { Directive, Input } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { UnsubscribeDirective } from "./unsubscribe.directive";

@Directive()
export class InputFieldDirective extends UnsubscribeDirective {
  @Input() label: string;
  @Input() control: string;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() form: FormGroup;

  constructor(protected formBuilder: FormBuilder) {
    super();
    this.label = "";
    this.type = "text";
    this.control = "";
    this.placeholder = "";
    this.form = formBuilder.group({});
  }

  protected get controller(): AbstractControl {
    let control = this.form.get(this.control);
    if (Object.keys(this.form.controls).includes(this.control)) {
      control = this.form.controls[this.control];
    }
    if (!control) {
      throw new Error("Field not found: " + control);
    }
    return control;
  }

  public get statusChanges$(): Observable<string> {
    return this.controller.statusChanges;
  }
}
