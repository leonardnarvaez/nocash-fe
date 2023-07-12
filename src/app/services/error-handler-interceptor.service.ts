import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
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
            alert('Unauthorized Access')
            this.authService.logout().subscribe(m => {
              console.error(m);
              this.router.navigateByUrl('/login')
            })
          } else if(error.status === 404) {
            alert('Resource not found');
          }
        }
      })
      
    );
  }
}
