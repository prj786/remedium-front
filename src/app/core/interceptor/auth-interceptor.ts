import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";
import {Injectable} from "@angular/core";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const user = localStorage.getItem('auth_info');

    if (user) {
      const token = JSON.parse(user).token;

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }


    return next.handle(request);
  }
}
