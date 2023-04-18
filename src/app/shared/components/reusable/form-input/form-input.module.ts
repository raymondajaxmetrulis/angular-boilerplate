import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from './form-input.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    MatSelectModule,
    MatCheckboxModule
  ],
  declarations: [FormInputComponent],
  exports: [FormInputComponent]
})
export class FormInputModule {}
