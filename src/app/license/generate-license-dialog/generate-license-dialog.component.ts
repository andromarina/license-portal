import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface GenerateDialogData {
  product: string;
  userName: string;
  company: string;
  numDays: number; // e.g., '1 year'
}

@Component({
  selector: 'generate-license-dialog',
  templateUrl: './generate-license-dialog.component.html',
  styleUrls: ['./generate-license-dialog.component.scss']
})
export class GenerateLicenseDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<GenerateLicenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GenerateDialogData
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}