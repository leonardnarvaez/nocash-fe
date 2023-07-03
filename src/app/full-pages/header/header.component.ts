import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  base_url;
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router
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
    
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }
}
