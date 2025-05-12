import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface RenewalDialogData {
  product: string;
  price: number;
  period: string; // e.g., '1 year'
}

@Component({
  selector: 'app-renew-license-dialog',
  templateUrl: './renew-license-dialog.component.html',
  styleUrls: ['./renew-license-dialog.component.scss']
})
export class RenewLicenseDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RenewLicenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RenewalDialogData
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}