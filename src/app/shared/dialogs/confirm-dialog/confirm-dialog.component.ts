import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogData } from 'app/shared/types/ConfirmDialogData.type';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: 'confirm-dialog.component.html',
})
export class ConfirmationDialogComponent {
  title: string = 'Confirm';
  message: string = 'Are you sure?';
  confirmButtonText: string = 'Yes';
  declineButtonText: string = 'No';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ConfirmDialogData,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {
    if (this.data) {
      this.message = data.message || this.message;
      this.confirmButtonText = this.data.confirmButtonText || this.confirmButtonText;
      this.declineButtonText = this.data.declineButtonText || this.declineButtonText;
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
