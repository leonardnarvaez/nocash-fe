import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-fail-dialog',
  templateUrl: './fail-dialog.component.html',
  styleUrls: ['./fail-dialog.component.css']
})
export class FailDialogComponent {
  errorMessage: string;
  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.errorMessage = data.errorMessage;
  }
  
}
