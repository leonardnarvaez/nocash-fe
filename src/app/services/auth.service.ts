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

  login(mobileNumber: string, pin: string) {
    console.log('~~ login ', this.API_HOST);
    this.stateService.removeCurrentUser();
    const res = this.httpClient.post<User>(`${this.API_HOST}/authentication/authenticate`, {
      mobileNumber,
      pin
    });
    res.subscribe((user: User) => {
      console.log(user);
      this.stateService.setCurrentUser(user);
    })
  }

  logout() {
    this.stateService.removeCurrentUser();
  }
}
