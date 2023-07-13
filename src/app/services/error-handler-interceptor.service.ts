import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FailDialogComponent } from '../full-pages/fail-dialog/fail-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptorService implements HttpInterceptor {
  dialogRef!: MatDialogRef<FailDialogComponent>
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        next: event => {
          if(event instanceof HttpResponse) {
            if(event.status === 403) {
              alert("Unauthorized access");
            }
          }
          return event;
        },
        error: error => {
          if(error.status === 403) {
            this.authService.logout().subscribe((m:any) => {
              console.error(m);
              this.openFailDialog(m.error)
              this.router.navigateByUrl('/login')
            })
          } else if(error.status === 404) {
            alert('Resource not found');
          }
        }
      })
      
    );
  }

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
}
