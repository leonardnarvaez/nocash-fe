import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css']
})
export class SuccessDialogComponent {
  successMessage: string;
  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.successMessage = data.successMessage;
}
}
