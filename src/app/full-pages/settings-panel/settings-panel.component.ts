import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { AuthStateService } from 'src/app/shared/auth-state.service';

@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.css']
})
export class SettingsPanelComponent implements OnInit{
  base_url;
  dialogRef!: MatDialogRef<LogoutConfirmationDialogComponent>;
  username: string;
  mobile: string;
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private location: Location,
    private authState: AuthStateService
    ){
    this.base_url = environment.API_HOST;
    const user = authState.getCurrentUser();
    this.username = user.firstName;
    this.mobile = user.mobileNumber;
  }
  ngOnInit(): void {
    this.httpClient.get(`${this.base_url}/api/employees`)
    .subscribe(employees => {
      console.log(employees);
    })
  }
  logout() {
    console.log('~~ logout');
    try {
      this.dialogRef.close();
    } catch(e) {
      console.log(e);
      
    }
    this.dialogRef = this.dialog.open(LogoutConfirmationDialogComponent, {
      width: '250px',
      data: {
        message: 'Are you sure you want to logout?',
      },
    });
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
    this.authService.logout().subscribe(m => {
      console.log(m);
      this.router.navigateByUrl('/login');
    });
  }
  })
}
goBack() {
  this.location.back();
}
}
@Component({
  selector: 'app-logout-confirmation-dialog',
  templateUrl: 'logout-confirmation-dialog.html',
})
export class LogoutConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LogoutConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
