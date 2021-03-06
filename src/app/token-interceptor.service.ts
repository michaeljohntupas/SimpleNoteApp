import { Injectable } from '@angular/core';
import {  HttpRequest,  HttpHandler,  HttpEvent,  HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const idToken = localStorage.getItem('token');
    if(idToken){
      let cloned = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${idToken}`)
      });
      return next.handle(cloned);
      
    }else{
      return next.handle(req);
    }
  }
}
