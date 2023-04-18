import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormInput } from 'app/shared/types/FormInput.type';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html'
})
export class FormInputComponent {
  @Input() field: FormInput<string | boolean>;
  @Input() form: FormGroup;

  hasFieldError(): boolean {
    return this.form.get(this.field.key).invalid && (this.form.get(this.field.key).dirty || this.form.get(this.field.key).touched);
  }
}
