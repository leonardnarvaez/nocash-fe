import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.css']
})
export class SettingsPanelComponent implements OnInit{
  base_url;
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router,
    private location: Location
    ){
    this.base_url = environment.API_HOST;
  }
  ngOnInit(): void {
    this.httpClient.get(`${this.base_url}/api/employees`)
    .subscribe(employees => {
      console.log(employees);
    })
  }
  logout() {
    console.log('~~ logout');
    
    this.authService.logout().subscribe(m => {
      console.log(m);
      this.router.navigateByUrl('/login');
    });
    
  }

  goBack() {
    this.location.back();
  }
}
