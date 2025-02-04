import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirm-dialog/confirm-dialog.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,

    MatDialogModule,
    MatButtonModule
  ],
  declarations: [ConfirmationDialogComponent]
})
export class DialogsModule {}
