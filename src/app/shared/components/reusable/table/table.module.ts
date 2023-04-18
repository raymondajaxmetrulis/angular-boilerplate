import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputModule } from '../form-input/form-input.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatChipsModule,

    FormInputModule
  ],
  declarations: [TableComponent],
  exports: [TableComponent]
})
export class TableModule {}
