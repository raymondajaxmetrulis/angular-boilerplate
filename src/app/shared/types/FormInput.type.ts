import { ValidatorFn } from '@angular/forms';

export class FormInput<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  options: { key: string; value: string; }[];
  validators: ValidatorFn[] | null;
  readonly: boolean;

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      options?: { key: string; value: string }[];
      validators?: ValidatorFn[] | null;
      readonly?: boolean;
    } = {},
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
    this.validators = options.validators || [];
    this.readonly = !!options.readonly;
  }
}

export class FormTextbox extends FormInput<string> {
  override controlType: string = 'textbox';
}

export class FormDropdown extends FormInput<string> {
  override controlType: string = 'dropdown';
}

export class FormCheckbox extends FormInput<string> {
  override controlType: string = 'checkbox';
}
