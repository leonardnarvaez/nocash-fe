import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-content-dialog',
  templateUrl: './content-dialog.component.html',
  styleUrls: ['./content-dialog.component.css']
})
export class ContentDialogComponent {
  successMessage: string;
  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.successMessage = data.successMessage;
    }
}
