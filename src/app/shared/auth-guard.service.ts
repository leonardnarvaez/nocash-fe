import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Injectable } from "@angular/core";

import { AuthService } from "../services/auth.service";
import { JwtService } from "./jwt.service";
import { AuthStateService } from "./auth-state.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, // dependency injection
    private router: Router,
    private jwtService: JwtService,
    private authStateService: AuthStateService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token: string = '';
    
    try {
      token = this.authStateService.getCurrentUser().jwt;
    }
    catch (e) {
      console.log(e);
    }
    

    if (this.authService.isAuthenticated()) {
      if(this.jwtService.isExpired(token))
      {
        alert("Session Expired HAHAHA")
        this.authService.logout();
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigate(["/login"], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
  }
}
