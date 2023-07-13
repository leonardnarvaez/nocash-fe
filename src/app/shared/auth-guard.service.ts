import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from "../services/auth.service";
import { JwtService } from "./jwt.service";
import { AuthStateService } from "./auth-state.service";
import { FailDialogComponent } from "../full-pages/fail-dialog/fail-dialog.component";

@Injectable()
export class AuthGuard implements CanActivate {
  dialogRef!: MatDialogRef<FailDialogComponent>
  constructor(
    private authService: AuthService, // dependency injection
    private router: Router,
    private jwtService: JwtService,
    private authStateService: AuthStateService,
    private dialog: MatDialog
  ) {}

  openFailDialog(errorMessage: string): void {
    const dialogRef = this.dialog.open(FailDialogComponent, {
      disableClose: false,
      autoFocus: false,
      data: {
        errorMessage: errorMessage
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

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
        this.openFailDialog("Session Expired, Please login before proceeding.")
        this.authStateService.removeCurrentUser();
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
