import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements  HttpInterceptor{

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let accessToken = this.auth.getToken();

    if(accessToken){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    }
   return next.handle(req);
  }
}
