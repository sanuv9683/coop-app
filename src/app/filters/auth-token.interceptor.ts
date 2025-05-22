import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {switchMap, take} from 'rxjs/operators';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.getIdToken().pipe(
      take(1),
      switchMap(token => {
        // If no token (user not signed in), just pass the request through
        if (!token) {
          return next.handle(req);
        }
        const authReq = req.clone({
          setHeaders: {Authorization: `Bearer ${token}`}
        });
        return next.handle(authReq);
      })
    );
  }
}
