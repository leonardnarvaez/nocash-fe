import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthStateService } from 'src/app/shared/auth-state.service';

@Component({
  selector: 'app-qrpage',
  templateUrl: './qrpage.component.html',
  styleUrls: ['./qrpage.component.css']
})
export class QRPageComponent {
  mobileNumber: string;
  username: string;
  constructor(
    private location: Location,
    private authState: AuthStateService
  ){
    this.mobileNumber = this.authState.getCurrentUser().mobileNumber;
    this.username = this.authState.getCurrentUser().firstName;
  }
  goBack(): void {
    this.location.back();
  }
}
