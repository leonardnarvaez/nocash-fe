import { Injectable } from '@angular/core';
import { 
  HttpEvent, 
  HttpHandler, 
  HttpInterceptor, 
  HttpRequest
} from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthStateService } from '../shared/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authStateService: AuthStateService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string;
    try {
      token = this.authStateService.getCurrentUser()?.jwt;
    } catch (e){
      token = '';
      console.log(e);
    }
    
    if (token.length === 0) 
    {
      return next.handle(req);
    }
    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next.handle(req1);
  }
}
