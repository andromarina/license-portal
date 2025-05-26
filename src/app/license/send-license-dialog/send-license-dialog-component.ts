import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface SendLicenseDialogData {
  email: string;
}

@Component({
  selector: 'send-license-dialog',
  templateUrl: './send-license-dialog-component.html',
})
export class SendLicenseDialogComponent {
  email = '';
  emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(
    public dialogRef: MatDialogRef<SendLicenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: SendLicenseDialogData
  ) {
    this.email = data.email || '';
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSend(): void {
    // close and return the edited email
    this.dialogRef.close(this.email);
  }
}
