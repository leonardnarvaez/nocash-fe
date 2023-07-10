import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";

import { AuthStateService } from '../shared/auth-state.service';
import { User } from '../models/user';
import { Observable, tap, pipe } from "rxjs";

@Injectable()
export class AuthService {
  private readonly API_HOST: string = environment.API_HOST;
  constructor(
    private stateService: AuthStateService,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  isAuthenticated() {
    return this.stateService.hasCurrentUser();
  }

  login(mobileNumber: string, pin: string): Observable<User> {
    console.log('~~ login ', this.API_HOST);
    this.stateService.removeCurrentUser();
    return this.httpClient.post<User>(`${this.API_HOST}/authentication/authenticate`, {
      mobileNumber,
      pin
    }).pipe(
      tap((user: User)=> this.stateService.setCurrentUser(user)),
    );
  }

  logout() {
    console.info("logout")
    return this.httpClient.get(`${this.API_HOST}/authentication/logout`).pipe(
      tap(message => {
        console.log(message);
        this.stateService.removeCurrentUser();
      })
    );
  }

  register(emailAddress: string, mobileNumber: string, pin: string): Observable<User> {
    return this.httpClient.post<User>(`${this.API_HOST}/authentication/register`, {
      emailAddress,
      mobileNumber,
      pin
    }).pipe(
      tap((user: User) => console.log(user))
    )
  }
}
