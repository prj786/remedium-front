import {finalize, Observable, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {AuthService} from "../../shared/services/auth.service";
import {NotifyService} from "../../shared/services/notify.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../shared/services/loader.service";
@Injectable()
export class Interceptor implements HttpInterceptor {


  constructor(private notify: NotifyService, private router: Router, private loader: LoaderService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
    (event: HttpEvent<any>) => {
        this.loader.start();
          if (event instanceof HttpResponse) {
            if (request.method === 'POST' || request.method === 'PUT') {
              this.notify.sendSuccess('success-request', 'success');
            }
          }
          }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['auth']).then(_ => {
                localStorage.removeItem('token');
                this.notify.sendError(err.message, err.status, false);
              })
            } else {
              this.notify.sendError('failed-request', err.status, true);
            }
          }
        }
      ),
      finalize(() => this.loader.finish())
    )
  }
}
